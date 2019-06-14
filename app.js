const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const csv = require('csvtojson/v1');

let app = express();


app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });



app.post('/conv', function(req, res) {
console.log(req.body.files)
csv()
.fromFile(req.body.files)

.then((jsonObj)=>{
  console.log(jsonObj);

});

})


app.listen(5000, function () {
  console.log('Example app listening on port 3000!');
})
