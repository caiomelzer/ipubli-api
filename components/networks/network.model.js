
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userId: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false },
        network: { type: DataTypes.STRING, allowNull: false },
        username:  { type: DataTypes.STRING, allowNull: false },
        avatar: { type: DataTypes.STRING, allowNull: true },
        url: { type: DataTypes.STRING, allowNull: true },
        followers: { type: DataTypes.INTEGER, allowNull: true , default: 0  },
        posts: { type: DataTypes.INTEGER, allowNull: true, default: 0  },
        networkIdent: { type: DataTypes.STRING, allowNull: true },

        
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['hash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('Network', attributes, options);
}