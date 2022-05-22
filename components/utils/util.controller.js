const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const axios = require("axios");
var fs = require('fs');
const netWork = require('../networks/network.service');
const utilService = require('../utils/util.service');
const networkService = require('../networks/network.service');


// routes
router.get('/instagram/', getInstagramUser);

router.get('/instagram/:username', getInstagramInfo);
router.put('/instagram/:username', updateInstagramInfo);

module.exports = router;
function getInstagramInfo(req, res, next) {
  const options = {
    method: 'GET',
    url: 'https://instagram-profile1.p.rapidapi.com/getprofile/'+req.params.username,
    headers: {
      'X-RapidAPI-Host': 'instagram-profile1.p.rapidapi.com',
      'X-RapidAPI-Key': 's0ZkL9xIhmmshLKzQoBI1GzIrm0Op10bhXtjsn4P3PuE6ELOqN'
    }
  };
  axios.request(options).then(function (response) {
    if(response.data.error === 'true'){

    }
    else{
      fs.writeFile('./public/INSTAGRAM_'+response.data.username+'.json', JSON.stringify(response.data), function (err) {
        if (err) return console.log(err);
      });
      res.send('Instagram data saved!');
    }

  }).catch(function (error) {
    res.send('Instagram data not saved!');
  });
}

function updateInstagramInfo(req, res, next) {
  utilService.updateInstagramInfo(req.params.username)
  .then(network => { 
    res.json(network);

  })
  .catch(next);
}


function getInstagramUser(req, res, next) {
  utilService.getInstagramUser(req.params.username)
  .then(network => { 
    res.json(network);
  })
  .catch(next);
}







