const { Error } = require('mongoose');
var mailer = require('nodemailer');
var path = require('path');

var keys = require('./keys.json');


var mailData = require('./mailData')

var transport = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: keys.mail.id,
        pass: keys.mail.passwword
    }
});

console.log(path.resolve('./rules/symphony.jpg'));
var CultRangMailer = (mailID, mailContent, name, attachments) => {
    var mailOptions = {
        from: "CultRang Registration Team",
        to: mailID,
        subject: mailContent.subject,
        html: mailContent.body,
        attachments: [{
            filename: name,
            path: attachments

        }]
    }

    transport.sendMail(mailOptions, (err, result) => {
        if(err) {
            console.error(err);
        }else {
            console.log(result.response);
        }
    })
}

var mailer = async (comp, mailID) => {
    if(mailData[comp]){
        if(comp=='filmwars'){
            CultRangMailer(mailID, mailData[comp], comp+'.pdf', path.resolve(`./APIs/rules/${comp}.pdf`));
        }
        else {
            CultRangMailer(mailID, mailData[comp], comp+'.jpg', path.resolve(`./APIs/rules/${comp}.jpg`));
        }
    }
    else {
        throw new Error("Competition not found")
    }
}

module.exports = mailer;