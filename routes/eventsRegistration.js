var express = require('express');
var bodyParser = require('body-parser');
const Events = require('../models/events')
const mailer = require('../APIs/mailingService')

var eventsRouter = express.Router();

eventsRouter.use(bodyParser.json());

eventsRouter.route('/:event')
    .post((req, res, next) => {
        var event = req.params.event;
        var name = req.body.name;
        var mail = req.body.mail;

        Events.insertMany({event: event, name: name, mailID: mail});

        mailer(event, mail).then(() => {
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

module.exports = eventsRouter;