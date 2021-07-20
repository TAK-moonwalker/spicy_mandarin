function loadVideosBts() {
    
    //DOM element
    const gallery = document.querySelector("#video-container")

   //Fetch videos from API
fetch('http://localhost:3030/api/videos/bts', {
        method: 'get',
          dataType: 'json',
    })
    .then(response => response.json())
    .then((response)=>{
        //console.log(response.titles.length);
            response.items.forEach((item)=>{

                //image thumbnail generator
               
                let imageLink = document.createElement("a");
                imageLink.className = "video";
                imageLink.setAttribute("title", `${item.title}`);
                imageLink.setAttribute("href", `https://www.youtube.com/watch?v=${item.resourceId.videoId}`)
                let image = document.createElement("img");
                image.classList.add("img-fluid", "z-depth-1", "m-2");
                image.setAttribute("src", `${item.thumbnails.medium.url}`);

                imageLink.appendChild(image);
                gallery.appendChild(imageLink);

                console.log(imageLink);
            console.log(image);

           } //for-loop end
            )
            
            
    
                
            })
.catch((error)=>{
    console.log('Failed to fetch API', error);
})
 
} //end LocadVideos function

// Invoking the loadVideos function
document.addEventListener("DOMContentLoaded", loadVideosBts);