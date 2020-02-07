const express = require('express');

const fs = require('fs');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const logger = require('morgan');
require("dotenv").config();


const app = express();
const USER_ROUTES =  require("./routes/user");


app.set('view engine','hbs');
app.set('views', path.join(__dirname,'/views'));


// let rawdata = fs.readFileSync('data.json');
// let dataObj= JSON.parse(rawdata);
// console.log(dataObj);

// hbs.registerHelper('if_eq', function(a, b, opts) {
//     if (a == b) {
//         return opts.fn(this);
//     } else {
//         return opts.inverse(this);
//     }
// });

// app.get('/', (req,res)=>{
//     res.render('indexTemplate.hbs',{object : dataObj} );
// });
// app.use(logger("dev"));

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: false })); 
//form-urlencoded
// app.use(express.static(__dirname + 'public'));


app.use("/user", USER_ROUTES);


// app.post('/submit-form', (req,res)=>{
//     console.log(req.body)
//     res.send("recieved your request!")
// })


app.listen(3000,()=> console.log('App listening on port 3000'));

module.exports = app;
