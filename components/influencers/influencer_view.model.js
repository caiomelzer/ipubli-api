
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const Influencers = sequelize.define('vw_influencers', {
      userId: {type: DataTypes.INTEGER, primaryKey: true},
      influencerId: DataTypes.INTEGER,
      country: DataTypes.STRING,
      state: DataTypes.STRING,
      city: DataTypes.STRING,
      instagramAvatar: DataTypes.STRING,
      instagramFollowers: DataTypes.STRING,
      instagramPosts: DataTypes.STRING,
      segments: DataTypes.STRING,
      startValue: DataTypes.DECIMAL,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
      }, {
      treatAsView: true,
      viewDefinition: ` create or replace view vw_influencers as SELECT u.id as userId, i.id as influencerId, 
      u.country as country, u.state as state, u.city as city, i.avatar as instagramAvatar, i.followers as instagramFollowers, 
      i.posts as instagramPosts, GROUP_CONCAT(s.segment) as segments, u.startValue as startValue, u.createdAt as createdAt,
       u.updatedAt as updatedAt FROM Users u inner join Networks i on u.id = i.userId left join Segments s on s.userId = u.id where u.isInfluencer = 'YES' 
      and i.network = 'INSTAGRAM' and u.status = 'ACTIVE' and (i.followers > -1 and i.posts > -1 and i.status = 'ACTIVE') group by u.id ;`
    });
    return Influencers;
}

//SELECT v.* from Users u inner JOIN favorites f on u.id = f.userId inner join vw_influencers v on v.id = f.influencerId where u.id = 1
