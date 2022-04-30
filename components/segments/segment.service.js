const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { Op } = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    delete: _delete
};



async function getAll(filters) {
    console.log(filters);
    return await db.Segment.findAll()
}

async function getById(id) {
    return await getSegment(id);
}

async function create(params) {
    // validate
    if (await db.Segment.findOne({ where: { id: params.id } })) {
        throw 'Segment "' + params.id + '" is already taken';
    }

    // save network
    await db.Segment.create(params);
}



async function _delete(id) {
    const network = await getSegment(id);
    await network.destroy();
}

// helper functions
async function getSegment(id) {
    const segment = await db.Segment.findByPk(id);
    if (!segment) throw 'Segment not found';
    return segment;
}
