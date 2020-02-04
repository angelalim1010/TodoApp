const express = require('express');
const app = express();
const fs = require('fs');
const handlebars = require('handlebars');

// fs.readFile('data.json', (err, data)=>{
//     if (err) throw err;
//     let activity = JSON.parse(data);
//     console.log(activity);
// })
let rawdata = fs.readFileSync('data.json');
let dataObj= JSON.parse(rawdata);
console.log(dataObj);
let source = "<ul> {{#each object}} <li>{{name}}</li> {{/each}} </ul>";
let wrapper = {object : dataObj};
let template = handlebars.compile(source);
 
// var data = { "name": "Alan", "hometown": "Somewhere, TX",
//              "kids": [{"name": "Jimmy", "age": "12"}, {"name": "Sally", "age": "4"}]};
let result = template(wrapper);
console.log(result);

app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.send("hello");
});

app.listen(3001,()=> console.log('App listening on port 3000'));