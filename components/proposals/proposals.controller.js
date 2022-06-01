const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const proposalService = require('./proposal.service');

// routes
router.get('/', authorize(), getAll);
router.get('/:id', authorize(), getById);
router.post('/', authorize(), createSchema, create);
router.put('/:id', authorize(), update);
router.put('/:id/user-approve', authorize(), userApprove);
router.put('/:id/influencer-approve', authorize(), influencerApprove);
router.put('/:id/influencer-reject', authorize(), influencerReject);

/*router.delete('/:id', authorize(), _delete);
router.put('/:id/approve', authorize(), updateSchema, update);
router.put('/:id/reject', authorize(), updateSchema, update);*/

module.exports = router;

function getAll(req, res, next) {
    proposalService.getAll(req.user.id, req.query)
        .then(proposals => res.json(proposals))
        .catch(next);
}

function getById(req, res, next) {

    proposalService.getById(req.user.id, req.params.id)
        .then(proposal => res.json(proposal))
        .catch(next);
}

function createSchema(req, res, next) {
    const schema = Joi.object({
        userId: Joi.string().required(),
        influecerId: Joi.string().required(),
        price: Joi.string().required(),
        details: Joi.string().required(),
        startedAt: Joi.string().required(),
        finishAt: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function create(req, res, next) {
    proposalService.create(req.body)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}


function update(req, res, next) {
    console.log('dasdasda')
    proposalService.update(req.user.id, req.params.id, req.body)
        .then(() => {
            console.log(res)
            res.json({ message: 'Updated successful' })
        })
        .catch(next);
}

function userApprove(req, res, next) {
    let userApprove = {
        isApprovedByUser: "YES",
        status:"WAITING"
    }
    proposalService.update(req.user.id, req.params.id, userApprove)
        .then(() => {
            console.log(res)
            res.json({ message: 'Updated successful' })
        })
        .catch(next);
}
function influencerApprove(req, res, next) {
    let influencerApprove = {
        isApprovedByInfluencer: "YES",
        status:"APPROVED",
        isIPubli: "YES"
    }
    proposalService.doIPubli(req.user.id, req.params.id, influencerApprove)
        .then(() => {
            console.log(res)
            res.json({ message: 'Updated successful' })
        })
        .catch(next);
}

function influencerReject(req, res, next) {
    let influencerApprove = {
        isApprovedByInfluencer: "YES",
        status:"REJECTED",
        isIPubli: "NO"
    }
    console.log('teste', req.user.id, req.params.id, influencerApprove)
    proposalService.doIPubli(req.user.id, req.params.id, influencerApprove)
        .then(() => {
            console.log(res)
            res.json({ message: 'Updated successful' })
        })
        .catch(next);
}



