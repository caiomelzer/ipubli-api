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
    
    let filtersCustom = {
        _top:10,
        _orderby:[],
        _filters:{
            influencerStatus: {[Op.eq]:'active'},
            userStatus: {[Op.eq]:'active'}
        }
    };
    if(filters.state)
        filtersCustom._filters.state =  {[Op.eq]: filters.state}
    if(filters.segments)
        filtersCustom._filters.segments =  {[Op.like]: filters.segments}
    if(filters._t)
        filtersCustom._top = parseInt(filters._t)
    if(filters._o){
        filters._o.split(';').forEach(function(filter){
            filtersCustom._orderby.push(filter.split(','));
        })
    }    
      
    return await db.InfluencerView.findAll({ 
        where: filtersCustom._filters,
        limit: filtersCustom._top,
        order: filtersCustom._orderby
    });
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
