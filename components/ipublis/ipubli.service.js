const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { Op } = require("sequelize");


module.exports = {
    getAll,
    getById
};



async function getAll(user_id, filters) {
    let filtersCustom = {
        _top:100,
        _orderby:[],
        _filters:{}
    };
    filtersCustom._filters.userId =  {[Op.eq]: user_id}
    filtersCustom._filters.isIPubli =  {[Op.eq]: 'YES'}
    if(filters._t)
        filtersCustom._top = parseInt(filters._t)
    if(filters._o){
        filters._o.split(';').forEach(function(filter){
            filtersCustom._orderby.push(filter.split(','));
        })
    }    
      
    return await db.Proposal.findAll({ 
        where: filtersCustom._filters,
        limit: filtersCustom._top,
        order: filtersCustom._orderby
    });
}
async function getById(user_id, id) {
    return await getIPubli(user_id, id);
}

async function getIPubli(user_id, id) {
    let filtersCustom = {
        _filters:{}
    };
    filtersCustom._filters.userId =  {[Op.eq]: user_id};
    filtersCustom._filters.id =  {[Op.eq]: id};
    filtersCustom._filters.isPubli =  {[Op.eq]: 'YES'};
    const ipubli = await db.Proposal.findAll({
        where: filtersCustom._filters
    });
    if (!ipubli) throw 'Proposal not found';
    return ipubli;
}
