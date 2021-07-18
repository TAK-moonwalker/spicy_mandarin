const mongoose = require('mongoose');
const validator = require('validator');

//Connect to Mongodb atlas
const dbURL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jc3q0.mongodb.net/SpicyMandarin?retryWrites=true&w=majority`
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('database connected :)');
}).catch((error)=>{
console.log('database failed to connect!', error);
})

