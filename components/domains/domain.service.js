const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { Op } = require("sequelize");


module.exports = {
    getAllStates
};



async function getAllStates(filters) {
    console.log(filters);
    let filtesCustom = {};
        
    return await db.State.findAll({ 
        where: filtesCustom
    });
}
