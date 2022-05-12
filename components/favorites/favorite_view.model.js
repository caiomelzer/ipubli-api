
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const Favorites = sequelize.define('vw_favorites', {
      userId: {type: DataTypes.INTEGER, primaryKey: true},
      instagramId: DataTypes.INTEGER,
      country: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      instagramAvatar: DataTypes.STRING,
      instagramFollowers: DataTypes.STRING,
      instagramPosts: DataTypes.STRING,
      segments: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
      
      // etc...
            }, {
      treatAsView: true,
      viewDefinition: `create or replace view vw_favorites as SELECT f.userId, v.instagramId, v.country, v.state, v.city, v.instagramAvatar, v.instagramFollowers, v.instagramPosts, v.segments, v.createdAt, v.updatedAt FROM Favorites f left join vw_influencers v on f.influencerId = v.userId      `
    });
    return Favorites;
}