const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const domainService = require('./domain.service');

// routes
router.get('/states/',  getAllStates);


module.exports = router;


function getAllStates(req, res, next) {
    domainService.getAllStates(req.query)
        .then(states => res.json(states))
        .catch(next);
}

