function loadVideos() {
    
    //DOM element
    const gallery = document.querySelector("#videoRow")
    const modalLocation = document.querySelector('#modal')

   //Fetch videos from API
fetch('', {
        method: 'get',
          dataType: 'json',
    })
    .then(response => response.json())
    .then((response)=>{

            let imgGallery = "";
            let videoModal = "";
    
            for(i=0;i<12;i++){
    
                imgGallery += 
                `<!--create modal link-->
                <div class="col-lg-4 col-md-12 mb-4 mb-lg-0">
                <a data-toggle="modal" data-target="#modal${i}"><img class="img-fluid z-depth-1" src="${response.srcUrl[i]}" alt="video"></a>
                </div>`
                
                videoModal += 
                `<div class="modal fade" id="modal${i}">
                <div class="modal-dialog modal-dialog-centered modal-lg">
                    <div class="modal-content">
                <div class="modal-header">
                    <h6>${response.titles[i]}</h6>
                </div>
                <div class="modal-body">
                    <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">
                        <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${response.videoID[i]}"
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
                
            gallery.innerHTML+= imgGallery;
            modalLocation.innerHTML += videoModal;
    
                
            })
.catch((error)=>{
    console.log('Failed to fetch API', error);
})
 
} //end LocadVideos function

// Invoking the loadVideos function
document.addEventListener("DOMContentLoaded", loadVideos);