const path = require('path');
const mongoose = require('mongoose')
const express = require('express');
require('dotenv').config()
const { SIGTERM } = require('constants');
const hbs = require('hbs');
const { send } = require('process');
const { Console } = require('console');
const fetchFiles = require('./util/fetch-image')
const app = express();
const port = process.env.PORT || 3030;



// define path for express
const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")
const images = path.join(__dirname, "../public/assets/gallery-images")
console.log(images);


// set-uo handlebars engine and path to views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);
app.use(express.static('gallery-images'))

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

//image gallery API
app.get('/gallery', async (req, res)=>{

try{

const list = await fetchFiles(images)
//console.log(list);
res.render('photo-gallery', {
    list
})

}catch(error){
    console.log('faild to fetch images')
}

})


app.get('*', (req, res)=>{
    res.send('404 not found!')
})

app.listen(port, ()=>{
    console.log(`server running on Port:${port}`);
})