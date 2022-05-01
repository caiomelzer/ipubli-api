const config = require('config.json');
const mysql = require('mysql2/promise');
//const { Sequelize, QueryTypes } = require('sequelize');
const Sequelize = require('sequelize-views-support');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`DROP DATABASE \`${database}\`;`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    
    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('../components/users/user.model')(sequelize);
    //db.Influencer = require('../components/influencers/influencer.model')(sequelize);
    db.Network = require('../components/networks/network.model')(sequelize);
    db.Segment = require('../components/segments/segment.model')(sequelize);
    db.Favorite = require('../components/favorites/favorite.model')(sequelize);
    db.State = require('../components/domains/state.model')(sequelize);
    db.Proposal = require('../components/proposals/proposal.model')(sequelize);
    //db.Ipubli = require('../components/ipublis/ipubli.model')(sequelize);

    //db.InfluencerView = require('../components/influencers/influencer_view.model')(sequelize);
   
    db.User.belongsToMany(db.Favorite, {
        through: "users_favorites",
        as: "favorites",
        foreignKey: "UserId",
    }); 

    db.User.belongsToMany(db.Network, {
        through: "users_networks",
        as: "networks",
        foreignKey: "UserId",
    }); 

    db.Network.belongsToMany(db.Segment, {
        through: "networks_segments",
        as: "segments",
        foreignKey: "NetworkId",
    }); 

    db.User.belongsToMany(db.Proposal, {
        through: "users_proposals",
        as: "proposals",
        foreignKey: "UserId",
    }); 

    // sync all models with database
    await sequelize.sync();
}