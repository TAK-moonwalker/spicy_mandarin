function loadVideos() {
    
    //DOM element
    const gallery = document.querySelector("#videoRow")
    const modalLocation = document.querySelector('#modal')

    const urlDev = 'http://localhost:3030/api/videos/lesson-spc'
    const urlPro = 'https://tak-spicymandarin.herokuapp.com/api/videos/lesson-spc'

   //Fetch videos from API
fetch(urlPro, {
        method: 'get',
          dataType: 'json',
    })
    .then(response => response.json())
    .then((response)=>{
             const itemList = response.items;
            // let imgGallery = "";
            let videoModal = "";
    
            for(let i=0;i<12;i++){

                //image thumbnail generator
                let div = document.createElement("div");
                div.classList.add("item", "col-lg-3", "col-md-4", "col-sm-6", "col-xs-12", "mt-3", "mb-3");
                let alink = document.createElement("a");
                alink.setAttribute("data-toggle", "modal");
                alink.setAttribute("data-target", `#modal${i}`);
                let imgSrc = document.createElement("img");
                imgSrc.setAttribute("src", `${itemList[i].thumbnails.medium.url}`);
                imgSrc.classList.add("img-fluid", "z-depth-1");

                alink.appendChild(imgSrc);
                div.appendChild(alink);

                gallery.appendChild(div);

                //console.log(div);

                //modals generator
            //     videoModal += 
            // `<div class="modal fade" id="modal${i}">
            //     <div class="modal-dialog modal-dialog-centered modal-lg">
            //         <div class="modal-content">
            //            <div class="modal-header">
            //                 <h6>${itemList[i].title}</h6>
            //            </div>
            //                <div class="modal-body">
            //                      <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">
            //                            <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/${itemList[i].resourceId.videoId}" allowfullscreen></iframe>
            //                      </div>
            //                               <div class="modal-footer">
            //                                   <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            //                               </div>
                
            //                </div>
            //            </div>
            //        </div>
            //  </div>`
   

            //generate modal
             const divModal = document.createElement('div');
             divModal.classList.add("modal", "fade");
             divModal.id = `modal${i}`;
             const divDialog = document.createElement("div");
             divDialog.classList.add("modal-dialog", "modal-dialog-centered", "modal-lg");
             const divContent = document.createElement("div");
             divContent.classList.add("modal-content");
             const divHeader = document.createElement("div");
             divHeader.className = "modal-header";
             const title = document.createElement("h6");
             const titleText = document.createTextNode(`${itemList[i].title}`);
             title.appendChild(titleText);
             divHeader.appendChild(title);
             const divBody = document.createElement("div");
             divBody.className = "modal-body";
             const divIframe = document.createElement("div");
             divIframe.classList.add("embed-responsive", "embed-responsive-16by9", "z-depth-1-half");
             const iframes = document.createElement("iframe");
             iframes.classList.add("embed-responsive-item");
             iframes.setAttribute("src", `https://www.youtube.com/embed/${itemList[i].resourceId.videoId}`);
             iframes.setAttribute("allowfullscreen", true);
             divIframe.appendChild(iframes);
             const divFooter = document.createElement("div");
             divFooter.classList.add("modal-footer");
             const button = document.createElement("button");
             button.classList.add("btn", "btn-secondary");
             button.setAttribute("data-dismiss", "modal");
             button.setAttribute("type", "button");
             const buttonValue = document.createTextNode("Close");
             button.appendChild(buttonValue);
             divFooter.appendChild(button);
             divBody.appendChild(divIframe);
             divBody.appendChild(divFooter);
             divContent.appendChild(divHeader);
             divContent.appendChild(divBody);
             divDialog.appendChild(divContent);
             divModal.appendChild(divDialog);

             modalLocation.appendChild(divModal);

    console.log(divModal);
            } //for-loop end

            // console.log(imgGallery);
            // console.log(videoModal);
                
            // gallery.innerHTML+= imgGallery;
            //modalLocation.innerHTML += videoModal;
    
                
            })
.catch((error)=>{
    console.log('Failed to fetch API', error);
})
 
} //end LocadVideos function

// Invoking the loadVideos function
document.addEventListener("DOMContentLoaded", loadVideos);