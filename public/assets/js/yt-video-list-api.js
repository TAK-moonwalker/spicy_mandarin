function loadVideos() {

    const mykey = "AIzaSyDpRIwauWZH7bueOaGJlPXgthsZxvp8-aI";
    const playListID = "PLa0YnQw04I6tWGRCtKrB9L5bZnK9GEbHP";
  
    const URL =  `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playListID}&key=${mykey}`;
  
    //DOM elements

    const gallery = document.querySelector('div.row')
    const modal = document.querySelector('section.videoModal')
  
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

imgGallery += `<div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
<div
  class="bg-image hover-overlay ripple shadow-1-strong rounded"
  data-ripple-color="light"
>
<figure>
  <img
    src="${thumImgUrl}"
    class="w-100"
  />
  <figcaption>${videoTitle}</figcaption>
  </figure>
  <a href="#!" data-mdb-toggle="modal" data-mdb-target="#Modal${target}">
    <div class="mask" style="background-color: rgba(251, 251, 251, 0.2);"></div>
  </a>
</div>
</div>`

videoModal += `<div
class="modal fade"
id="Modal${target}"
tabindex="-1"
aria-labelledby="exampleModal1Label"
aria-hidden="true"
>
<div class="modal-dialog modal-lg">
  <div class="modal-content">
    <div class="ratio ratio-16x9">
      <iframe
        src="https://www.youtube.com/embed/${videoId}"
        title="${videoTitle}"
        allowfullscreen
      ></iframe>
    </div>

    <div class="text-center py-3">
      <button type="button" class="btn btn-secondary" data-mdb-dismiss="modal">
        Close
      </button>
    </div>
  </div>
</div>
</div>`
} //for-loop end

console.log(imgGallery);
console.log(videoModal);
console.log(modal);
console.log(gallery);
gallery.innerHTML+=imgGallery;
modal.innerHTML+=videoModal;

}).catch(function(error) {
        console.log("Looks like there was a problem: \n", error);
      });
  } // End of loadVideos function
  

// Invoking the loadVideos function
loadVideos();