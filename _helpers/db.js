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
    //await connection.query(`DROP DATABASE \`${database}\`;`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    
    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.User = require('../components/users/user.model')(sequelize);
    db.Influencer = require('../components/influencers/influencer.model')(sequelize);
    db.Network = require('../components/networks/network.model')(sequelize);
    db.Segment = require('../components/segments/segment.model')(sequelize);
    db.Favorite = require('../components/favorites/favorite.model')(sequelize);
    db.State = require('../components/domains/state.model')(sequelize);
    db.Proposal = require('../components/proposals/proposal.model')(sequelize);
    //db.Ipubli = require('../components/ipublis/ipubli.model')(sequelize);

    db.InfluencerView = require('../components/influencers/influencer_view.model')(sequelize);
   
    db.User.belongsToMany(db.Favorite, {
        through: "users_favorites",
        as: "favorites",
        foreignKey: "UserId",
    }); 


    db.Favorite.belongsToMany(db.User, {
        through: "users_favorites",
        as: "users",
        foreignKey: "FavoriteId",
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

    db.Segment.belongsToMany(db.Network, {
        through: "networks_segments",
        as: "networks",
        foreignKey: "SegmentId",
    }); 

    db.User.belongsToMany(db.Proposal, {
        through: "users_proposals",
        as: "proposals",
        foreignKey: "UserId",
    }); 

    // sync all models with database
    await sequelize.sync();
    /*
    await connection.query(` USE ipubli; `);
    await connection.query(`INSERT INTO Users (id,firstName,lastName,username,hash,email,state,status,avatar,isInfluencer,createdAt,updatedAt) VALUES (DEFAULT,'Caio','Melzer','caiomelzer','$2a$10$BDZsvx37Cx1MQfUwVK5/Xu6KLwHYkj20yAH8TduGs.BYFcxlDtrz.','melzer.caio@gmail.com','SP','I','/assets/images/avatar.png','NO','2022-05-01 03:09:30','2022-05-01 03:09:30');`);
    await connection.query(`INSERT INTO Users (id,firstName,lastName,username,hash,email,state,status,avatar,isInfluencer,createdAt,updatedAt) VALUES (DEFAULT,'Marcella','Lawder','marcella','$2a$10$BDZsvx37Cx1MQfUwVK5/Xu6KLwHYkj20yAH8TduGs.BYFcxlDtrz.','melzer.caio@gmail.com','SP','I','/assets/images/avatar.png','YES','2022-05-01 03:09:30','2022-05-01 03:09:30');`);
    await connection.query(`INSERT INTO Users (id,firstName,lastName,username,hash,email,state,status,avatar,isInfluencer,createdAt,updatedAt) VALUES (DEFAULT,'Influencer 1','Influencer','Teste 1','$2a$10$BDZsvx37Cx1MQfUwVK5/Xu6KLwHYkj20yAH8TduGs.BYFcxlDtrz.','melzer.caio@gmail.com','SP','I','/assets/images/avatar.png','YES','2022-05-01 03:09:30','2022-05-01 03:09:30');`);
    await connection.query(`INSERT INTO Users (id,firstName,lastName,username,hash,email,state,status,avatar,isInfluencer,createdAt,updatedAt) VALUES (DEFAULT,'Influencer 2','Influencer','Teste 2','$2a$10$BDZsvx37Cx1MQfUwVK5/Xu6KLwHYkj20yAH8TduGs.BYFcxlDtrz.','melzer.caio@gmail.com','SP','I','/assets/images/avatar.png','YES','2022-05-01 03:09:30','2022-05-01 03:09:30');`);
    await connection.query(`INSERT INTO Users (id,firstName,lastName,username,hash,email,state,status,avatar,isInfluencer,createdAt,updatedAt) VALUES (DEFAULT,'Influencer 3','Influencer','Teste 3','$2a$10$BDZsvx37Cx1MQfUwVK5/Xu6KLwHYkj20yAH8TduGs.BYFcxlDtrz.','melzer.caio@gmail.com','SP','I','/assets/images/avatar.png','YES','2022-05-01 03:09:30','2022-05-01 03:09:30');`);
    await connection.query(`INSERT INTO States (id, state, createdAt, updatedAt) VALUES (DEFAULT, 'SP', NOW(), NOW());`);
    await connection.query(`INSERT INTO States (id, state, createdAt, updatedAt) VALUES (DEFAULT, 'RJ', NOW(), NOW());`);
    await connection.query(`INSERT INTO Networks (id, userId, status, network, avatar, url, followers, posts, createdAt, updatedAt, username, networkIdent) VALUES (NULL, '2', '', 'INSTAGRAM', '/assets/images/avatar.png', 'https://www.instagram.com/', '0', '0', NOW(), NOW(), 'ladylawoficial','');`);
    await connection.query(`INSERT INTO Networks (id, userId, status, network, avatar, url, followers, posts, createdAt, updatedAt, username, networkIdent) VALUES (NULL, '4', '', 'INSTAGRAM', '/assets/images/avatar.png', 'https://www.instagram.com/', '0', '0', NOW(), NOW(), 'caiomelzer','');`);
    await connection.query(`INSERT INTO Networks (id, userId, status, network, avatar, url, followers, posts, createdAt, updatedAt, username, networkIdent) VALUES (NULL, '3', '', 'INSTAGRAM', '/assets/images/avatar.png', 'https://www.instagram.com/', '0', '0', NOW(), NOW(), '','');`);
    await connection.query(`INSERT INTO Segments (id, segment, networkId, createdAt, updatedAt) VALUES (NULL, 'beleza', '1', NOW(), NOW());`);
    await connection.query(`INSERT INTO Segments (id, segment, networkId, createdAt, updatedAt) VALUES (NULL, 'beleza', '2', NOW(), NOW());`);
    await connection.query(`INSERT INTO Segments (id, segment, networkId, createdAt, updatedAt) VALUES (NULL, 'futebol', '2', NOW(), NOW());`);
    await connection.query(`INSERT INTO networks_segments (createdAt, updatedAt, NetworkId, SegmentId) VALUES (NOW(), NOW(), '1', '1');`);
    await connection.query(`INSERT INTO networks_segments (createdAt, updatedAt, NetworkId, SegmentId) VALUES (NOW(), NOW(), '1', '2');`);
    await connection.query(`INSERT INTO users_networks (createdAt, updatedAt, UserId, NetworkId) VALUES (NOW(), NOW(), '3', '1'); `);
    await connection.query(`INSERT INTO users_networks (createdAt, updatedAt, UserId, NetworkId) VALUES (NOW(), NOW(), '4', '2');`);
    await connection.query(`INSERT INTO users_networks (createdAt, updatedAt, UserId, NetworkId) VALUES (NOW(), NOW(), '5', '3');`);
    await connection.query(`INSERT INTO Favorites (id, userId, influencerId, createdAt, updatedAt) VALUES (NULL, '1', '3', NOW(), NOW());`);
    await connection.query(`INSERT INTO Favorites (id, userId, influencerId, createdAt, updatedAt) VALUES (NULL, '2', '3', NOW(), NOW());`);
    await connection.query(`INSERT INTO Favorites (id, userId, influencerId, createdAt, updatedAt) VALUES (NULL, '1', '2', NOW(), NOW());`);
    await connection.query(`INSERT INTO Proposals (id, userId, influecerId, price, status, startedAt, finishAt, isIPubli, isApprovedByUSer, isApprovedByInfluencer, details, createdAt, updatedAt) VALUES (NULL, '1', '3', '300.00', 'DRAFT', '2022-03-09 00:25:44', '2022-05-19 00:25:44', 'NO', 'NO', 'NO', 'Proposta de Teste', NOW(), NOW());`);
    await connection.query(`INSERT INTO Proposals (id, userId, influecerId, price, status, startedAt, finishAt, isIPubli, isApprovedByUSer, isApprovedByInfluencer, details, createdAt, updatedAt) VALUES (NULL, '1', '4', '300.00', 'APPROVED', '2022-03-09 00:25:44', '2022-05-19 00:25:44', 'YES', 'NO', 'NO', 'Proposta de Teste', NOW(), NOW());`);
    await connection.query(`INSERT INTO Proposals (id, userId, influecerId, price, status, startedAt, finishAt, isIPubli, isApprovedByUSer, isApprovedByInfluencer, details, createdAt, updatedAt) VALUES (NULL, '2', '3', '300.00', 'DRAFT', '2022-03-09 00:25:44', '2022-05-19 00:25:44', 'NO', 'NO', 'NO', 'Proposta de Teste', NOW(), NOW());`);
    await connection.query(`INSERT INTO Proposals (id, userId, influecerId, price, status, startedAt, finishAt, isIPubli, isApprovedByUSer, isApprovedByInfluencer, details, createdAt, updatedAt) VALUES (NULL, '2', '4', '300.00', 'APPROVED', '2022-03-09 00:25:44', '2022-05-19 00:25:44', 'YES', 'NO', 'NO', 'Proposta de Teste', NOW(), NOW());`);
    await connection.query(`INSERT INTO users_proposals (createdAt, updatedAt, UserId, ProposalId) VALUES (NOW(), NOW(), '1', '3');`);
    await connection.query(`INSERT INTO users_proposals (createdAt, updatedAt, UserId, ProposalId) VALUES (NOW(), NOW(), '1', '4');`);
    await connection.query(`INSERT INTO users_proposals (createdAt, updatedAt, UserId, ProposalId) VALUES (NOW(), NOW(), '2', '4');`);
    await connection.query(`INSERT INTO users_proposals (createdAt, updatedAt, UserId, ProposalId) VALUES (NOW(), NOW(), '2', '3');`);

    await connection.query(`INSERT INTO users_favorites (createdAt, updatedAt, UserId, FavoriteId) VALUES (NOW(), NOW(), '1', '1');`);
    await connection.query(`INSERT INTO users_favorites (createdAt, updatedAt, UserId, FavoriteId) VALUES (NOW(), NOW(), '2', '2');`);
    await connection.query(`INSERT INTO users_favorites (createdAt, updatedAt, UserId, FavoriteId) VALUES (NOW(), NOW(), '1', '2');`);
*/
    console.log('Start Load Completed');
    
}

