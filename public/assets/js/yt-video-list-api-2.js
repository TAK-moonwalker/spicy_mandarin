

function loadVideos() {

    const mykey = "AIzaSyDpRIwauWZH7bueOaGJlPXgthsZxvp8-aI";
    const playListID = "PLa0YnQw04I6tWGRCtKrB9L5bZnK9GEbHP";
    const maxRes = 12;
  
    const URL =  `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxRes}&playlistId=${playListID}&key=${mykey}`;
  
    //DOM elements

    const gallery = document.querySelector('.youtubeApi div.row')
  
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

`<!-- Grid column -->
<div class="col-sm-6 col-lg-3 col-md-4 mb-4">

<!--Modal: Name-->
<div class="modal fade" id="modal${target}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div class="vertical-alignment-helper">
<div class="modal-dialog vertical-align-center modal-lg" role="document">

    <!--Content-->
    <div class="modal-content">

      <!--Body-->
      <div class="modal-body mb-0 p-0">

        <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">
          <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${videoId}"
            allowfullscreen></iframe>
        </div>

      </div>

        <button type="button" class="btn btn-primary btn-rounded btn-md ml-4 m-2" data-dismiss="modal">Close</button>

    </div>
    <!--/.Content-->

  </div>
  </div>
  <!--vertical helper-->
</div>
<!--Modal: Name-->
<figure>
<a><img class="img-fluid z-depth-1" src="${thumImgUrl}" alt="video"
    data-toggle="modal" data-target="#modal${target}"></a>
    <figcaption>${videoTitle}</figcaption>
</figure>
</div>
<!-- Grid column -->`

} //for-loop end

console.log(imgGallery);
console.log(gallery);
gallery.innerHTML+=imgGallery;

}).catch(function(error) {
        console.log("Looks like there was a problem: \n", error);
      });
  } // End of loadVideos function
  

// Invoking the loadVideos function
document.addEventListener("DOMContentLoaded", loadVideos);
