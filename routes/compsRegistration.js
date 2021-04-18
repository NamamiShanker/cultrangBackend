var express = require('express');
var bodyParser = require('body-parser');
const SoloComps = require('../models/soloComps')
const mailer = require('../APIs/mailingService')

var compsRouter = express.Router();

compsRouter.use(bodyParser.json());

compsRouter.route('/:comp')
    .post((req, res, next) =>{
        var comp = req.params.comp;
        var name = req.body.name;
        var mail = req.body.mail;
        SoloComps.insertMany({
            name: name,
            mailID: mail,
            comp: comp,
        })

        mailer(comp, mail).then(() => {
            console.log('Mail Sent Successfully');
            res.status(200);
            res.setHeader('Content-Type', 'application/json');
            res.json({msg:'Mail Sent Successfully', success: true})
        }).catch((err) => {
            console.log(err);
            res.status(500);
            res.setHeader('Content-Type', 'application/json')
            res.json({error:'Competition not found', success:false})
        });
    })


module.exports = compsRouter;