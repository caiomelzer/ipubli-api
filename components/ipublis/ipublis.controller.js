const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const ipubliService = require('./ipubli.service');

// routes
router.get('/', authorize(), getAll);


module.exports = router;


function getAll(req, res, next) {
    ipubliService.getAll(req.query)
        .then(ipublis => res.json(ipublis))
        .catch(next);
}



