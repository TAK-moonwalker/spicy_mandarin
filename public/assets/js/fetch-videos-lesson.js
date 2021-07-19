function loadVideosLesson() {
    
    //DOM element
    const gallery = document.querySelector("#video-container")

   //Fetch videos from API
fetch('http://localhost:3030/api/videos/lesson', {
        method: 'get',
          dataType: 'json',
    })
    .then(response => response.json())
    .then((response)=>{
        console.log(response.titles.length);
            for(let i=0;i<response.titles.length;i++){

                //image thumbnail generator
               
                let imageLink = document.createElement("a");
                imageLink.className = "video";
                imageLink.setAttribute("title", `${response.titles[i]}`);
                imageLink.setAttribute("href", `https://www.youtube.com/watch?v=${response.videoID[i]}`)
                let image = document.createElement("img");
                image.classList.add("img-fluid", "z-depth-1", "m-2");
                image.setAttribute("src", `${response.srcUrl[i]}`);

                imageLink.appendChild(image);
                gallery.appendChild(imageLink);

                console.log(imageLink);
            console.log(image);

           } //for-loop end

            
            
    
                
            })
.catch((error)=>{
    console.log('Failed to fetch API', error);
})
 
} //end LocadVideos function

// Invoking the loadVideos function
document.addEventListener("DOMContentLoaded", loadVideosLesson);