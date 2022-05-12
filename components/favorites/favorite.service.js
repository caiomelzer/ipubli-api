const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { Op } = require("sequelize");


module.exports = {
    getAll,
    add,
    //remove
};

async function getAll(user_id) {
    console.log(user_id)
    return await db.FavoriteView.findAll({ 
        where: {
            userId:  {[Op.eq]: user_id}
        }
    });
}


async function add(params) {
    // validate
    /*if (await db.User.findOne({ where: { username: params.username } })) {
        throw 'Username "' + params.username + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    // save user
    await db.User.create(params);*/
}