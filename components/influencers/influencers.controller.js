const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const influencerService = require('./influencer.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.put('/:id/enable', authorize(), enable);
router.put('/:id/disable', authorize(), disable);
router.delete('/:id', authorize(), _delete);


module.exports = router;


function getAll(req, res, next) {
    influencerService.getAll(req.query)
        .then(influencers => res.json(influencers))
        .catch(next);
}

function getById(req, res, next) {
    influencerService.getById(req.params.id)
        .then(influencer => res.json(influencer))
        .catch(next);
}

function enable(req, res, next) {
    influencerService.enable(req.params.id, req.body)
    .then(influencer => res.json(influencer))
    .catch(next);
}

function disable(req, res, next) {
    influencerService.disable(req.params.id, req.body)
    .then(influencer => res.json(influencer))
    .catch(next);
}

function _delete(req, res, next) {
    influencerService.delete(req.params.id)
        .then(() => res.json({ message: 'Influencer deleted successfully' }))
        .catch(next);
}


