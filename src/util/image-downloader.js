const fs = require('fs');
const path = require('path');
require('../db/mongoose');
const download = require('image-downloader');
const Teacher = require('../models/model-teacher');



module.exports.createModelList = async ()=>{
let models = [];
let thumbNailList = [];
let profileList = [];
const destThumb = path.join(__dirname, "../../public/assets/model-images/profs")
const destProf = path.join(__dirname, "../../public/assets/model-images/profs")
const modelList = await Teacher.find();
models = modelList;
models.forEach(model => {
    thumbNailList.push(model.thumbnail);
    profileList.push(model.profilePhoto);
});

for(let i = 0; profileList.length > i; i++){

    download.image({
        url: profileList[i],
        dest: destProf
    })
    .then(({ filename }) => {
      console.log('Saved to', filename)  // saved to /path/to/dest/image.jpg
    })
    .catch((err) => console.error(err))
    

}
}



