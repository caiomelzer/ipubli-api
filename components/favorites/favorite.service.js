const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { Op } = require("sequelize");


module.exports = {
    getAll,
    add,
    _delete
};

async function getAll(user_id) {
    console.log(user_id)
    return await db.FavoriteView.findAll({ 
        where: {
            userId:  {[Op.eq]: user_id}
        }
    });
}


async function add(user_id, influencer_id) {
    console.log(user_id, influencer_id)
    await db.Favorite.create({
        userId:user_id,
        influencerId: influencer_id
    });
}

async function _delete(user_id, influencer_id) {
    const favorite = await db.Favorite.findOne({
        where: {
            userId:user_id,
            influencerId: influencer_id 
        }
    }); 
    console.log(favorite)
    await favorite.destroy();
}
