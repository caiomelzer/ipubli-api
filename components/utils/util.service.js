const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { Op } = require("sequelize");
const fs = require('fs');
const puppeteer = require('puppeteer');


module.exports = {
    updateInstagramInfo,
    getInstagramUser
};

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
    console.log('INSTA DATA', instagram.id)
    let params;
    if(instagram.id){
        params = {
            followers:instagram.followers,
            avatar: instagram.profile_pic_url,
            posts: instagram.lastMedia.count,
            networkIdent: instagram.id
        }
        console.log(params)
        fs.copyFile('./public/INSTAGRAM_'+networkIdent.username.toLowerCase()+'.json', './public/INSTAGRAM_'+instagram.id+'.json', function (err) {
            if (err) throw err;
            console.log('File Renamed.');
        });
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setViewport({ width: 150, height: 150 });
        console.log(instagram.profile_pic_url)
        // Navigate to this blog post and wait a bit.
        await page.goto(instagram.profile_pic_url);
        await page.screenshot({
            path: './public/INSTAGRAM_'+instagram.id+'.png',
            omitBackground: true,
        });

        await browser.close();
        
///UPDATE `Networks` SET `updatedAt` = '2022-03-01 11:36:57', posts= 0, followers =0, networkIdent=null


        

        
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
