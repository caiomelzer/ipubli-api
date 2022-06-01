const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { Op } = require("sequelize");
const { param } = require('./proposals.controller');
const axios = require("axios");
const userService = require('../users/user.service');
const utilService = require('../utils/util.service');





module.exports = {
    getAll,
    getById,
    create,
    update,
    doIPubli
    //delete: _delete
};

async function getAll(user_id, filters) {
    return await db.Proposal.findAll({ 
        where: {
            [Op.and]:[
                {
                    isIPubli:{[Op.eq]: 'NO'}
                }
            ],
            [Op.or]: [
              {
                userId: {
                  [Op.eq]: user_id
                }
              },
              {
                influecerId: {
                    [Op.eq]: user_id
                  }
              }
            ]
        }
    });
}

async function getById(user_id, id) {
    return await getProposal(user_id, id);
}

async function getProposal(user_id, id) {
    const proposal = await db.Proposal.findOne({
        where: {
            [Op.and]:[
                {
                    isIPubli:{[Op.eq]: 'NO'}
                }
            ],
            [Op.or]: [
              {
                userId: {
                  [Op.eq]: user_id
                }
              },
              {
                influecerId: {
                    [Op.eq]: user_id
                  }
              }
            ]
        }
    });
    if (!proposal) throw 'Proposal not found';
    return proposal;
}

async function getProposalByInfluencer(influencer_id, id) {
    const proposal = await db.Proposal.findOne({
        where: {
            [Op.and]:[
                {
                    isIPubli:{[Op.eq]: 'NO'}
                },
                {
                    influecerId: {[Op.eq]: influencer_id}
                }
                ,
                {
                    id: {[Op.eq]: id}
                }
            ]
        }
    });
    if (!proposal) throw 'Proposal not found';
    return proposal;
     
  
}

async function create(params) {
    params.status = "DRAFT";
    params.isIPubli = "NO";
    params.isApprovedByUser = "NO";
    params.isApprovedByInfluencer = "NO";
    await db.Proposal.create(params);
    const options = {
        method: 'POST',
        url: 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com',
          'X-RapidAPI-Key': 's0ZkL9xIhmmshLKzQoBI1GzIrm0Op10bhXtjsn4P3PuE6ELOqN'
        },
        data: '{"personalizations":[{"to":[{"email":"melzer.caio@gmail.com"}],"subject":"Você tem uma nova Proposta"}],"from":{"email":"ipubli@ipubli.app"},"content":[{"type":"text/plain","value":"Olá, você recebeu uma nova proposta. Acesse o aplicativo para ter mais informações."}]}'
      };
      await axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

async function update(user_id, id, params) {
    const proposal = await getProposal(user_id, id);
    Object.assign(proposal, params);
    await proposal.save();
    return proposal.get();
}

async function doIPubli(influencer_id, id, data) {
    console.log('oi', influencer_id)
    const proposal = await getProposalByInfluencer(influencer_id, id);
    Object.assign(proposal, data);
    await proposal.save();
    userService.getById(proposal.userId)
    .then((user) => {
        console.log(proposal)
        const options = {
            to: user.username,
            type: 'proposal-action',
            message: 'A proposta #'+proposal.id+' foi atualizada, entre no aplicativo para ver as novidades ou utilize o link: http:ipubli.app/#/proposals',
            title: 'Sua proposta foi atualizada'
        }
        utilService.sendNotifications(options)
    })
    return proposal.get();
}