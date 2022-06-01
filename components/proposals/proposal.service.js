const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { Op } = require("sequelize");
const { param } = require('./proposals.controller');


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
}

async function update(user_id, id, params) {
    const proposal = await getProposal(user_id, id);
    Object.assign(proposal, params);
    await proposal.save();
    return proposal.get();
}

async function doIPubli(influencer_id, id, params) {
    console.log(params)
    const proposal = await getProposalByInfluencer(influencer_id, id);
    Object.assign(proposal, params);
    await proposal.save();
    return proposal.get();
}