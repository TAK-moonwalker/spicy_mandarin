const mongoose = require('mongoose');
const validator = require('validator');

const VideoSchema = new mongoose.Schema({
    videoId:{
        type: String
    },
    videoUrl: {
        type: String
    }
})
 
const teacherSchema = new mongoose.Schema({
    name: {
        type : String,
    },
    hometown: {
        type : String,
        default : "not available"
    },
    about: {
        type : String,
    },
   videos: {
       type : VideoSchema
    },

   thumbnail: String,

   profilePhoto: String
})

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher