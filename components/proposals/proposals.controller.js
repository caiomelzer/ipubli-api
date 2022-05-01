const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const proposalService = require('./proposal.service');

// routes
router.get('/', authorize(), getAll);


module.exports = router;


function getAll(req, res, next) {
    proposalService.getAll(req.query)
        .then(proposals => res.json(proposals))
        .catch(next);
}


