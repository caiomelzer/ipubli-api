
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const Favorites = sequelize.define('vw_favorites', {
      userId: {type: DataTypes.INTEGER, primaryKey: true},
      influencerId: DataTypes.INTEGER,
      country: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      startValue: DataTypes.STRING,
      instagramAvatar: DataTypes.STRING,
      instagramFollowers: DataTypes.STRING,
      instagramPosts: DataTypes.STRING,
      segments: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
      
      // etc... 
            }, {
      treatAsView: true,
      viewDefinition: `create or replace view vw_favorites as SELECT f.userId, v.influencerId, v.country, v.state, v.city, v.startValue, v.instagramAvatar, v.instagramFollowers, v.instagramPosts, v.segments, v.createdAt, v.updatedAt FROM Favorites f left join vw_influencers v on f.influencerId = v.userId      `
    });
    return Favorites;
}
