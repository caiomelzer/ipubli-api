const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { Op } = require("sequelize");


module.exports = {
    getAll,
    getById,
    create,
    enable,
    disable,
    delete: _delete,
    update
};



async function getAll(filters) {
    console.log(filters);
    return await db.Network.findAll({ where: {
        status: {[Op.notLike]: '%tive'} 
        },
        include:['segments']
    })
}


async function getById(id) {
    return await getNetwork(id);
}

async function create(params) {
    // validate
    if (await db.Network.findOne({ where: { id: params.id } })) {
        throw 'Network "' + params.id + '" is already taken';
    }

    // save network
    await db.Network.create(params);
}

async function enable(id, params) {
    const network = await getNetwork(id);
    network.status = 'enable';
    await network.save();
    return network.get();
}

async function disable(id, params) {
    const network = await getNetwork(id);
    network.status = 'disable';
    await network.save();
    return network.toJSON();
}

async function _delete(id) {
    const network = await getNetwork(id);
    await network.destroy();
}

async function update(id, params) {
    const network = await getNetwork(id);
    Object.assign(network, params);
    await network.save();
    return network.get();
}

// helper functions
async function getNetwork(id) {
    const network = await db.Network.findByPk(id);
    if (!network) throw 'Network not found';
    return network;
}
