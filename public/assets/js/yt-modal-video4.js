

function loadVideos() {

    const mykey = "AIzaSyDpRIwauWZH7bueOaGJlPXgthsZxvp8-aI";
    const playListID = "PLa0YnQw04I6tWGRCtKrB9L5bZnK9GEbHP";
    const maxRes = 36;
  
    const URL =  `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxRes}&playlistId=${playListID}&key=${mykey}`;
  
    //DOM elements

    const gallery = document.querySelector("#videoRow")
    const modalLocation = document.querySelector('#modal')

    fetch(URL,{
      method: 'get',
        dataType: 'json',
  }).then(response => response.json())
  .then((resData) =>{ 

    console.log(resData.items[0].snippet.thumbnails.medium.url);
    console.log(resData.items[0].snippet.title);
    console.log(resData.items[0].snippet.resourceId.videoId);
    console.log(resData.items.length)

let imgGallery = "";
let videoModal = "";

for(let i = 0; i < resData.items.length; i++){

let thumImgUrl = resData.items[i].snippet.thumbnails.high.url;
let videoTitle = resData.items[i].snippet.title;
let videoId = resData.items[i].snippet.resourceId.videoId;
let target = i;

imgGallery += 
`<!--create modal link-->
<div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
<a data-toggle="modal" data-target="#modal${target}"><img class="img-fluid z-depth-1" src="${thumImgUrl}" alt="video"></a>
</div>`

videoModal += 
`<div class="modal fade" id="modal${target}">
<div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
<div class="modal-header">
    <h6>${videoTitle}</h6>
</div>
<div class="modal-body">
    <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">
        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${videoId}"
          allowfullscreen></iframe>
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
</div>

</div>
</div>
</div>
</div>`

} //for-loop end


console.log(imgGallery);
console.log(gallery);
gallery.innerHTML+= imgGallery;
modalLocation.innerHTML += videoModal;

}).catch(function(error) {
        console.log("Looks like there was a problem: \n", error);
      });
  } // End of loadVideos function
  

// Invoking the loadVideos function
document.addEventListener("DOMContentLoaded", loadVideos);
