
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userId: { type: DataTypes.STRING, allowNull: false },
        influenceId: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: false , default: 'OPEN'},
        startedAt: { type: DataTypes.DATE, allowNull: true},
        finishAt: { type: DataTypes.DATE, allowNull: true},
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

    return sequelize.define('Ipubli', attributes, options);
}