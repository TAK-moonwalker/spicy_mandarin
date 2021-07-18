const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose')
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser')
const { SIGTERM } = require('constants');
const hbs = require('hbs');
const { send } = require('process');
const { Console } = require('console');
const axios = require('axios');
const fetchFiles = require('./util/fetch-image')
const fetchVideos = require('./util/fetch-videos')
const Teacher = require('./models/model-teacher')
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());

// define path for express
const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

//check .env
console.log(process.env.DB_URI)

// set-up handlebars engine and path to views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);
//app.use(express.static('gallery-images'))

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


// video gallery - Lesson
app.get('/api/videos/lesson', async (req, res)=>{
    
    const URL =  `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLa0YnQw04I6tWGRCtKrB9L5bZnK9GEbHP&key=${process.env.API_KEY}`;
try{
    const resObj = await fetchVideos(URL);
    const itemArray = resObj.items
    //console.log(itemArray);
    let titles = [];
    let videoID = [];
    let srcUrl = [];
    itemArray.forEach(element => {
        titles.push(element.snippet.title);
        videoID.push(element.snippet.resourceId.videoId);
        srcUrl.push(element.snippet.thumbnails.medium.url);
    })
    //console.log(titles);
    //console.log(videoID);
    //console.log(srcUrl);
    res.json({
        titles,
        videoID,
        srcUrl
    })

}catch(error){
    res.status(500).send(error);
}
})

// video gallery - Teaser
app.get('/api/videos/teaser', async (req, res)=>{
    
    const URL =  `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLa0YnQw04I6ufLa4SmC9Mmf7Rjqr7eNvM&key=${process.env.API_KEY}`;
try{
    const resObj = await fetchVideos(URL);
    const itemArrayTs = resObj.items
    res.send(itemArrayTs);
    

}catch(error){
    res.status(500).send(error);
}
})

// video gallery - BTS
app.get('/api/videos/bts', async (req, res)=>{
    
    const URL =  `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLa0YnQw04I6uYMCxTyxNWLwfoqfW9pqkv&key=${process.env.API_KEY}`;
try{
    const resObj = await fetchVideos(URL);
    const itemArrayBts = resObj.items
    res.send(itemArrayBts);
    

}catch(error){
    res.status(500).send(error);
}
})


//image gallery Page rendering
app.get('/gallery', async (req, res)=>{
    const images = path.join(__dirname, "../public/assets/gallery-images")
   // console.log(images);
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


//image gallery API 
app.get('/api/images', async(req, res)=>{
    const images = path.join(__dirname, "../public/assets/gallery-images")
    try{
const imageList = await fetchFiles(images);
res.json(imageList);
    }catch(error){
        res.send("Failed to fecth images");
    }
})

//teachers page API
app.get('/api/teacher', async()=>{
try{
   const teacher = await Teacher.find({})
}catch(error){

}
})

app.post('/api/teacher', async(req, res)=>{
    
    const newTeacher = new Teacher(req.body);

try{

        const teacher = await newTeacher.save();
        res.status(202).send(teacher);

    }catch(error){

    }
})

app.get('/api/teachers', async (req, res)=>{

try{
 const teacherList = await Teacher.find({}).sort({name: 1});
 res.json(teacherList);

}catch(error){
    res.status(502).send('Failed to fetch teacher data');
}

})

app.post('/api/teachers', async(req, res)=>{
    try{
    const response = await Teacher.insertMany(
        req.body
    )
res.send(response);

    }catch(error){
        console.log('Failed to InsertMany')
    }
})

app.get('/api/teacher/:id', async(req, res)=>{
const _id = req.params.id;

try{
   
    const teacher = await Teacher.findById(_id);
    if(!teacher){
      return res.status(404).send("teacher not found")
    }

    res.json(teacher);

}catch(error){
    res.status(502).send(error)
}


})

// error handling
app.get('*', (req, res)=>{
    res.send('404 not found!')
})

//server runs
app.listen(port, ()=>{
    console.log(`server running on Port:${port}`);
})