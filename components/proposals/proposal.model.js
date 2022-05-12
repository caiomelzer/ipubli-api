
const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        userId: { type: DataTypes.STRING, allowNull: false },
        influecerId: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.DECIMAL, allowNull: false , default:0},
        status: { type: DataTypes.STRING, allowNull: false , default: 'DRAFT'},
        startedAt: { type: DataTypes.DATE, allowNull: true},
        finishAt: { type: DataTypes.DATE, allowNull: true},
        isIPubli: { type: DataTypes.STRING, allowNull: true, default: 'NO'},
        isApprovedByUser: { type: DataTypes.STRING, allowNull: true, default: 'NO'},
        isApprovedByInfluencer: { type: DataTypes.STRING, allowNull: true, default: 'NO'},
        details: { type: DataTypes.TEXT, allowNull: true},
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

    return sequelize.define('Proposal', attributes, options);
}