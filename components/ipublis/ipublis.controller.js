const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const ipubliService = require('./ipubli.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);

module.exports = router;


function getAll(req, res, next) {
    ipubliService.getAll(req.user.id, req.query)
        .then(ipublis => res.json(ipublis))
        .catch(next);
}

function getById(req, res, next) {
    ipubliService.getById(req.user.id, req.params.id)
        .then(ipubli => res.json(ipubli))
        .catch(next);
}


