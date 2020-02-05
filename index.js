const express = require('express');

const fs = require('fs');
const path = require('path');
const hbs = require('hbs');

const app = express();

app.set('view engine','hbs');
app.set('views', path.join(__dirname,'/views'));


let rawdata = fs.readFileSync('data.json');
let dataObj= JSON.parse(rawdata);
console.log(dataObj);

hbs.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

app.get('/', (req,res)=>{
    res.render('indexTemplate.hbs',{object : dataObj} );
});

app.listen(3001,()=> console.log('App listening on port 3001'));