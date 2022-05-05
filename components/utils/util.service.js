const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { Op } = require("sequelize");
const fs = require('fs');


module.exports = {
    updateInstagramInfo,
    getInstagramUser
};

async function getInstagramUser() {
    const network = await await db.Network.findOne({
        where: {
            network: {[Op.eq]: 'INSTAGRAM'},
            username: {[Op.ne]: ''}

        },
        limit:1,
        order:[
            ['updatedAt','ASC']
        ]
    })
    if (!network) throw 'Network not found';
    return network.get();    
}


async function updateInstagramInfo(username) {
    const network = await db.Network.findOne({
        where: {
            network: {[Op.eq]: 'INSTAGRAM'},
            username: {[Op.eq]: username}
        },
        limit:1,
        order:[
            ['updatedAt','ASC']
        ]
    })
    if (!network) throw 'Network not found';
    let networkIdent = network.get();
    const networkFile = fs.readFileSync('./public/INSTAGRAM_'+networkIdent.username.toLowerCase()+'.json')
    const instagram = JSON.parse(networkFile);
    console.log(instagram.id)
    let params;
    if(instagram.id){
        params = {
            followers:instagram.followers,
            avatar: instagram.profile_pic_url,
            posts: instagram.lastMedia.count,
            networkIdent: instagram.id
        }
    }
    else{
        params = {
            followers:0,
            networkIdent: '???'
        }
    }
    
    Object.assign(network, params);
    await network.save();
    return network.get();    
}
