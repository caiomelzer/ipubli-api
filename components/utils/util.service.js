const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { Op } = require("sequelize");
const fs = require('fs');
const puppeteer = require('puppeteer');
const axios = require("axios");

module.exports = {
    updateInstagramInfo,
    getInstagramUser,
    sendNotifications
};

async function sendNotifications(params){
    let data = {
        "personalizations":[
            {
                "to":[{"email":params.to}],
                "subject":params.title}],
                "from":{"email":"ipubli@ipubli.app"},
                "content":[{"type":"text/plain","value":params.message
            }
        ]
    }
    const options = {
        method: 'POST',
        url: 'https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Host': 'rapidprod-sendgrid-v1.p.rapidapi.com',
          'X-RapidAPI-Key': 's0ZkL9xIhmmshLKzQoBI1GzIrm0Op10bhXtjsn4P3PuE6ELOqN'
        },
        data: JSON.stringify(data)
      };
     await axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
}

async function getInstagramUser() {
    const network = await await db.Network.findOne({
        where: {
            network: {[Op.eq]: 'INSTAGRAM'},
            username: {[Op.ne]: ''}

        },
        limit:1,
        order:[
            ['updatedAt','ASC']
        ]
    })
    if (!network) throw 'Network not found';
    return network.get();    
}

async function updateInstagramInfo(username) {
    const network = await db.Network.findOne({
        where: {
            network: {[Op.eq]: 'INSTAGRAM'},
            username: {[Op.eq]: username}
        },
        limit:1,
        order:[
            ['updatedAt','ASC']
        ]
    })
    if (!network) throw 'Network not found';
    let networkIdent = network.get();
    const networkFile = fs.readFileSync('./public/INSTAGRAM_'+networkIdent.username.toLowerCase()+'.json')
    const instagram = JSON.parse(networkFile);
    let params;
    if(instagram.id){
        params = {
            followers:instagram.followers,
            avatar: '/public/INSTAGRAM_'+instagram.id+'.png',
            posts: instagram.lastMedia.count,
            networkIdent: instagram.id
        }
        fs.copyFile('./public/INSTAGRAM_'+networkIdent.username.toLowerCase()+'.json', './public/INSTAGRAM_'+instagram.id+'.json', function (err) {
            if (err) throw err;
            console.log('File Renamed.');
        });
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setViewport({ width: 150, height: 150 });
        await page.goto(instagram.profile_pic_url);
        await page.screenshot({
            path: './public/INSTAGRAM_'+instagram.id+'.png',
            omitBackground: true,
        });
        await browser.close();
    }
    else{
        params = {
            followers:0,
            networkIdent: '???'
        }
    }
    Object.assign(network, params);
    await network.save();
    return network.get();    
}
