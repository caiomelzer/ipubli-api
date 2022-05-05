
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const Foo = sequelize.define('vw_influencers', {
      username: DataTypes.STRING,
      userStatus: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      influencerStatus: DataTypes.STRING,
      network: DataTypes.STRING,
      posts: DataTypes.STRING,
      followers: DataTypes.STRING,
      url: DataTypes.STRING,
      avatar: DataTypes.STRING,
      networkStatus: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      segments: DataTypes.STRING

      // etc...
            }, {
      treatAsView: true,
      viewDefinition: ` create or replace view vw_influencers as select  u.id , 
      u.username, u.status as userStatus from users u;
      `
    });
    return Foo;
}