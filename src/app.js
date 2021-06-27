const path = require('path');
const mongoose = require('mongoose')
const express = require('express');
const { SIGTERM } = require('constants');
const hbs = require('hbs');
const { send } = require('process');
const app = express();
const port = process.env.PORT || 3030;

// define path for express
const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

// set-uo handlebars engine and path to views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// set-up static directory to serve
app.use(express.static(publicDir));



// routing
// spicy-mandarin.com/ => root
app.get('/',(req, res)=>{
res.render('index')
})

// /videos
app.get('/videos',(req, res)=>{
    res.render('videos')
    })



app.get('*', (req, res)=>{
    res.send('404 not found!')
})

app.listen(port, ()=>{
    console.log(`server running on Port:${port}`);
})