function loadVideos() {

    let pagetoken = '';
    let resultCount = 0;
    const mykey = "AIzaSyDpRIwauWZH7bueOaGJlPXgthsZxvp8-aI";
    const playListID = "PLa0YnQw04I6tWGRCtKrB9L5bZnK9GEbHP";
  
    const URL =  `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playListID}&key=${mykey}`;
  
  
    fetch(URL,{
      method: 'get',
        dataType: 'json',
  }).then(response => response.json())
  .then((resData) =>{ 
          console.log(resData.items[0].snippet.channelId)
      }).catch(function(error) {
        console.log("Looks like there was a problem: \n", error);
      });
  } // End of loadVideos function
  
// Invoking the loadVideos function
loadVideos();