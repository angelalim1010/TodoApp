const express = require('express');

const fs = require('fs');
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require("cookie-parser");


const app = express();


require('dotenv').config();
 if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
 }

const USER_ROUTES =  require("./routes/user");
const INDEX_ROUTES = require("./routes/index");
const AUTH_ROUTES = require("./routes/auth");


app.set('views', path.join(__dirname,'/views'));
app.set('view engine','hbs');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));


app.use(cookieParser());

app.use("/", INDEX_ROUTES);
app.use("/user", USER_ROUTES);
app.use("/auth", AUTH_ROUTES);


// catch 404 and forward to error handler
app.use(function(req,res){
   res.status(404).render('error.hbs');
});


app.listen(3000,()=> console.log('App listening on port 3000'));

module.exports = app;
