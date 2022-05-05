const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const networkService = require('./network.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id/enable', authorize(), enable);
router.put('/:id/disable', authorize(), disable);
router.delete('/:id', authorize(), _delete);


module.exports = router;


function getAll(req, res, next) {
    networkService.getAll(req.query)
        .then(networks => res.json(networks))
        .catch(next);
}

function getById(req, res, next) {
    networkService.getById(req.params.id)
        .then(network => res.json(network))
        .catch(next);
}

function enable(req, res, next) {
    networkService.enable(req.params.id, req.body)
    .then(network => res.json(network))
    .catch(next);
}

function disable(req, res, next) {
    networkService.disable(req.params.id, req.body)
    .then(network => res.json(network))
    .catch(next);
}

function _delete(req, res, next) {
    networkService.delete(req.params.id)
        .then(() => res.json({ message: 'Influencer deleted successfully' }))
        .catch(next);
}




