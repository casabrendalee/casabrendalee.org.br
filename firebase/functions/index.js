'use strict';
const functions  = require('firebase-functions');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});

let url = `smtps://site.casabrendalee%40gmail.com:${encodeURIComponent('sergio#2018')}@smtp.gmail.com:465`;
let transporter = nodemailer.createTransport(url);

exports.enviarEmail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    let email = {
        from: '"Site Casa Brenda Lee" <site.casabrendalee@gmail.com>',
        to: 'site.casabrendalee@gmail.com',
        subject: req.body['subject'],
        html: req.body['content']
    };

    transporter.sendMail(email, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).send('não foi possível enviar o e-mail');
        }
        console.log('Mensagem %s enviada: %s', info.messageId, info.response);
        return res.status(200).send('e-mail enviado com sucesso');
    });
  });
});