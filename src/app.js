const path = require('path');
const mongoose = require('mongoose')
const express = require('express');
const { SIGTERM } = require('constants');
const app = express();
const port = process.env.PORT || 3030;

app.set('view engine', 'hbs');
app.get('/',(req, res)=>{
res.render('index', {
    title: "Hishori Abe no site",
    description: "Welcome to fastest site in japan"
})
})

const publicDir = path.join(__dirname, "../public")

app.use(express.static(publicDir));

// routing
// spicy-mandarin.com/ => root

app.get('/', (req, res)=>{
res.send('Hello Express!');
})


app.listen(port, ()=>{
    console.log(`server running on Port:${port}`);
})