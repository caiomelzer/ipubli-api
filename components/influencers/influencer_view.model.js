
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const Foo = sequelize.define('vw_influencers', {
        user_id: DataTypes.DATE,
        // etc...
      }, {
        treatAsView: true,
        viewDefinition: `      CREATE OR REPLACE VIEW vw_influencers AS select influencers.* from Users join Influencers on Users.id = Influencers.user_id
        `
      });
     
      return Foo;
}