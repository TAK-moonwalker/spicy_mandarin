const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose')
const express = require('express');
const passport = require('passport');
require('dotenv').config();
const bodyParser = require('body-parser')
const { SIGTERM } = require('constants');
const hbs = require('hbs');
const { send } = require('process');
const { Console } = require('console');
const axios = require('axios');
var bcrypt = require('bcryptjs');
var flash = require('connect-flash');
const fetchFiles = require('./util/fetch-image');
const fetchVideos = require('./util/fetch-videos');
const isAuth = require('./util/auth').isAuth;
const Teacher = require('./models/model-teacher');

const app = express();
const port = process.env.PORT || 3030;

const session = require('express-session');
const MongoStore = require('connect-mongo');
const UserModel = require('./models/uder-model');

//include mongoDB
require('./db/mongoose');

//set up session
const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jc3q0.mongodb.net/SpicyMandarin?retryWrites=true&w=majority`

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: dbURL,
        collectionName: 'sessions' // See below for details
      }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 15 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    }
}));
// flash message set-up
app.use(flash());

//require config file
require('../config/passport');
require('../config/session');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session())

//Playground
app.use((req,res,next)=>{
    console.log(req.session);
    console.log(req.user);
    next();
})



// define path for express
const publicDir = path.join(__dirname, "../public/")
const viewsPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")


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

// videos
app.get('/videos', (req, res)=>{
    res.render('videos')
    })


// API video gallery - Sexy Lesson
app.get('/api/videos/lesson-sex', async (req, res)=>{
    
    const URL =  `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLy69FmXA8yWtBJ4Lr47ftyHndZ0AD8ACo&key=${process.env.API_KEY}`;
try{
    const resObj = await fetchVideos(URL);
    const itemArrayLesson1 = resObj.items
    let items = [];

     itemArrayLesson1.forEach((data)=>{
 items.push(data.snippet)
     })
    //res.json({itemArrayBt});

    //const test = itemArrayTs[0].snippet;
    res.send({items});


}catch(error){
    res.status(500).send(error);
}
})

// API video gallery - Spicy Lesson
app.get('/api/videos/lesson-spc', async (req, res)=>{
    
    const URL =  `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLy69FmXA8yWvx76rfQRxYHJeX7NRVJQow&key=${process.env.API_KEY}`;
try{
    const resObj = await fetchVideos(URL);
    const itemArrayLesson2 = resObj.items
    let items = [];

     itemArrayLesson2.forEach((data)=>{
 items.push(data.snippet)
     })
    //res.json({itemArrayBt});

    //const test = itemArrayTs[0].snippet;
    res.send({items});


}catch(error){
    res.status(500).send(error);
}
})


// API video gallery - Teaser
app.get('/api/videos/teaser', async (req, res)=>{
    
    const URL =  `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLa0YnQw04I6ufLa4SmC9Mmf7Rjqr7eNvM&key=${process.env.API_KEY}`;
try{
    const resObj = await fetchVideos(URL);
    const itemArrayTs = resObj.items;

    let items = [];

     itemArrayTs.forEach((data)=>{
 items.push(data.snippet)
     })
    //res.json({itemArrayBt});

    //const test = itemArrayTs[0].snippet;
    res.send({items});
       
}catch(error){
    res.status(500).send(error);
}
})

// API video gallery - BTS
app.get('/api/videos/bts', async (req, res)=>{

    const URL =  `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLa0YnQw04I6uYMCxTyxNWLwfoqfW9pqkv&key=${process.env.API_KEY}`;
    
try{
    const resObj = await fetchVideos(URL);
    const itemArrayBt = resObj.items;

     let items = [];

     itemArrayBt.forEach((data)=>{
 items.push(data.snippet)
     })
    //res.json({itemArrayBt});

    //const test = itemArrayTs[0].snippet;
    res.send({items});
       
}catch(error){
    res.status(500).send(error);
}
})



// Videos gallery - GET
app.get('/lesson-sex', (req, res)=>{
    res.render('videosexylesson', {
        title:"Video - Sexy Series"
    })
})

app.get('/lesson-spc', (req, res)=>{
    res.render('videospicylesson', {
        title: "Video - Spicy Series"
    })
})

app.get('/bts', (req, res)=>{
    res.render('videobts', {
        title:"Video - BTS"
    })
})

app.get('/teaser', (req, res) =>{
    res.render('videoteaser', {
        title:"Video - Teaser"
    })
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
 
 res.json({
   teacherList
})

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
const reg = new RegExp("iframe");

try{
   
    const teacher = await Teacher.findById(_id);
    if(!teacher){
      return res.status(404).send("teacher not found")
    }
    const checkElm = teacher.profilePhoto;
    //check iframe or image
    if(reg.test(checkElm)){
    res.render('teacher-profile-video', {
       teacher
    });
}else{

    res.render("teacher-profile", {
        teacher
    })
//     res.render('teacher-profile-img', {
//         teacher
// });
}  
}catch(error){
    res.status(502).send(error)
}


})

//teacher page - GET
app.get('/teachers', (req,res)=>{
    res.render('teacher-gallery')
})

//test page
app.get('/test', (req, res)=>{
    res.render('test', {
        title: "Video - BTS"
    });
})


//user login and registration page route
app.post('/register', async (req, res)=>{
     
    const{name, email, password1, password2} = req.body;
  
     let errors = [];

//check passwords match
if(password1 !== password2){
    errors.push({msg: "Passwords do not match"});
}

//check password length
if(password1.length < 6){
    errors.push({msg: "Password should be more than 6 characters"})
}

//check if email exist
const userCheck = await UserModel.findOne({
    email: req.body.email
})
    if(userCheck){
        errors.push({msg: "email already exist"})
    } 


if(errors.length > 0){
   res.render("register", {
       errors
   })

}else{
    try{
        const user = new UserModel({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password1,
        })
           const newUser = await user.save();
        //   res.send(newUser);
           res.redirect('/login')
 
    }catch(error){
        res.send('failed to register')
    }
}
})

app.post('/login', passport.authenticate('local'), async (req, res)=>{
    res.send("You are now logged in!");
    console.log(req.body);
})

app.get('/login', (req, res)=>{
    res.render('login');
})

app.get('/register', (req, res)=>{
    res.render('register');
})

app.get('/logout', (req,res)=>{
    req.logout();
    res.send('you are logged out');
})

// error handling
app.get('*', (req, res)=>{
    res.send('404 not found!')
})

//server runs
app.listen(port, ()=>{
    console.log(`server running on Port:${port}`);
})


