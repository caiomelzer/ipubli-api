const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { Op } = require("sequelize");


module.exports = {
    getAll
};



async function getAll(filters) {
    console.log(filters);
    return await db.Ipubli.findAll()
}
