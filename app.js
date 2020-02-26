require('dotenv').config();
 if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
 }

const express = require('express');
const path = require('path');
const hbs = require('hbs');
const logger = require('morgan');
const cookieParser = require("cookie-parser");

const app = express();



//importing the routes
const USERS_ROUTES =  require("./routes/users");
const INDEX_ROUTES = require("./routes/index");
const AUTH_ROUTES = require("./routes/auth");
const TODO_ROUTES = require("./routes/todos");

//adding cookie secret for cookieparser
const cookieSecret = "secret"
//process.env.COOKIE_SECRET


app.set('views', path.join(__dirname,'/views'));
app.set('view engine','hbs');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(cookieSecret));


app.use(cookieParser());

//the endpoints for routes
app.use("/", INDEX_ROUTES);
app.use("/users", USERS_ROUTES);
app.use("/auth", AUTH_ROUTES);
app.use("/todos", TODO_ROUTES);

//helper function to do == in hbs to do if (a == b)
hbs.registerHelper('if_eq', function(a, b, opts) {
   if (a == b) {
       return opts.fn(this);
   } else {
       return opts.inverse(this);
   }
});

// catch 404 and forward to error handler
app.use(function(req,res){
   res.status(404).render('error.hbs');
});


app.listen(process.env.PORT || 3000,()=> console.log('App listening on port 3000'));

module.exports = app;
