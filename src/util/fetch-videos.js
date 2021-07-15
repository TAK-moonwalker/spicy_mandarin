

//  FETCH VIDEOS FROM YOUTUBE
    
const axios = require('axios');


    const fetchVideos = async (url)=>{

     try{
         
       const response = await axios.get(url);
       
       return response.data;

     }catch(error){
      return error;
     }
    }


    module.exports = fetchVideos