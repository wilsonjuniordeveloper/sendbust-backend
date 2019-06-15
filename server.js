const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const csv = require('csvtojson/v1');
const schedule = require('node-schedule');



let app = express();

app.use(express.urlencoded({extended: true }))
app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });


app.get('/', function (req, res) {
  res.send('<h1>Hello World firebase!</h1>');
});



app.post('/send', function (req, res) {


    var sendlist = req.body.list;
    var message_increment = 0;

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

    // aqui esta fazendo o envio para a lista

    function trigger_sending(env){
      console.log(env.email)
        transporter.sendMail({
            from: 'Devin from At The Door <devin@atthedoor.app>',
            to: env.email, //email address of our recipient
            subject: 'Events and first impressions At The Door ',
            text: '##Plaintext version of the message##',
            html: req.body.html,
        }, (error, info) => {
            if (error) {
                  return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);


          
        });
    }


    if(message_increment === sendlist.length){
      res.json({
        'suces': 'sucesso'
      })
    }

   



      var message_job = schedule.scheduleJob('*/10 * * * * *', function(){
           trigger_sending(sendlist[message_increment]);
           if(message_increment < sendlist.length){
                message_increment++;

           }
           if(message_increment >= sendlist.length){
                message_job.cancel();
                // stop our function when last message is sent
           }
     });




});

app.listen(process.env.PORT || 4000)
