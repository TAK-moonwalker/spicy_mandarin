const mongoose = require('mongoose');
const validator = require('validator');

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
       videoId : {
         type: String
       },
       videoUrl : {
         type: String
       }
   },
   thumbnail: {

   },
   profilePhoto:{

   }
})

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher