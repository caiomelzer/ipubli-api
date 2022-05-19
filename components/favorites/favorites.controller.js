const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const favoriteService = require('./favorite.service');
const userService = require('./../users/user.service');

// routes
router.get('/', authorize(), getAll);
router.delete('/:id', authorize(), _delete);
router.post('/:id', authorize(), add);
module.exports = router;
function getAll(req, res, next) {
    console.log(req.user)
    favoriteService.getAll(req.user.id)
        .then(favorites =>{
            console.log(req.user.id, favorites)
            
            res.json(favorites)}
        
        
        
        )
        .catch(next);
}

function add(req, res, next) {
    console.log('dadadasdasda')
    favoriteService.add(req.user.id, req.params.id)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}

function _delete(req, res, next) {
    favoriteService._delete(req.user.id, req.params.id)
        .then(() => res.json({ message: 'Registration successful' }))
        .catch(next);
}



