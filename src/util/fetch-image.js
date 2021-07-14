const fs = require('fs');
const path = require('path');

// const imagePath = path.join(__dirname, "../../public/assets/gallery-images")
// console.log(imagePath);

const fetchFiles = async (dirPath) =>{

    try{
    fileNames = await fs.readdirSync(dirPath);
    
    //const fileListJson = JSON.stringify(fileNames)

    //console.log(fileListJson);

    return fileNames;

// file check
//     console.log("\nCurrent directory filenames:");
//      fileNames.forEach(file => {
//      console.log(file);
// })

} catch(error){
console.log(error)
}
}

// fetchFiles(imagePath);

module.exports = fetchFiles
