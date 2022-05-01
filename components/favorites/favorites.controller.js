const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const favoriteService = require('./favorite.service');
const userService = require('./../users/user.service');

// routes
router.get('/', authorize(), getAll);
module.exports = router;
function getAll(req, res, next) {
    console.log(req.user)
    favoriteService.getAll(req.user.id)
        .then(favorites => res.json(favorites))
        .catch(next);
}

function add(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}



