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
    delete: _delete
};



async function getAll(filters) {
    console.log(filters);
    return await db.InfluencerView.findOne({ where: {
        status: {[Op.notLike]: '%tive'} 
        } 
    })
}

async function getById(id) {
    return await getInfluencer(id);
}

async function create(params) {
    // validate
    if (await db.Influencer.findOne({ where: { id: params.id } })) {
        throw 'Influencer "' + params.id + '" is already taken';
    }

    // save influencer
    await db.Influencer.create(params);
}

async function enable(id, params) {
    const influencer = await getInfluencer(id);
    influencer.status = 'enable';
    await influencer.save();
    return influencer.get();
}

async function disable(id, params) {
    const influencer = await getInfluencer(id);
    influencer.status = 'disable';
    await influencer.save();
    return influencer.get();
}

async function _delete(id) {
    const influencer = await getInfluencer(id);
    await influencer.destroy();
}

// helper functions
async function getInfluencer(id) {
    const influencer = await db.Influencer.findByPk(id);
    if (!influencer) throw 'Influencer not found';
    return influencer;
}

async function getInfluencerView(id) {
    const influencer = await db.getInfluencerView;
    if (!influencer) throw 'Influencer not found';
    return influencer;
}
