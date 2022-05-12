const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        firstName: { type: DataTypes.STRING, allowNull: true },
        lastName: { type: DataTypes.STRING, allowNull: true },
        username: { type: DataTypes.STRING, allowNull: false },
        hash: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false },
        country: { type: DataTypes.STRING, allowNull: true },
        city: { type: DataTypes.STRING, allowNull: true },
        state: { type: DataTypes.STRING, allowNull: true},
        status: { type: DataTypes.STRING, allowNull: true, defaultValue: 'INACTIVE' },
        avatar: { type: DataTypes.STRING, allowNull: true, defaultValue: '/assets/images/avatar.png'},
        isInfluencer: { type: DataTypes.STRING, allowNull: true, defaultValue: 'NO'},
        startValue: { type: DataTypes.DECIMAL, allowNull: true, defaultValue: 0},
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

    return sequelize.define('User', attributes, options);
}