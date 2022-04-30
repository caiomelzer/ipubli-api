
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
      viewDefinition: ` create or replace view vw_influencers as select  u.id , u.username, u.status as userStatus, u.city, u.state, i.status as influencerStatus, n.network, n.posts, n.followers, n.url, n.status as networkStatus, u.createdAt, u.updatedAt, n.avatar, i.segments  from Influencers i  inner join Users u  on u.id = i.user_id  left join Networks n  on u.id =n.user_id 
      `
    });
    return Foo;
}