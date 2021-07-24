function loadVideos() {
    
    //DOM element
    const gallery = document.querySelector("#videoRow");
    const iframeTitle = document.querySelector(".mfp-title")

    const urlDev = 'http://localhost:3030/api/videos/lesson-spc';
    const urlPro = 'https://tak-spicymandarin.herokuapp.com/api/videos/lesson-spc';

   //Fetch videos from API
fetch(urlPro, {
        method: 'get',
          dataType: 'json',
    })
    .then(response => response.json())
    .then((response)=>{
             const itemList = response.items;
    
            for(let i=0;i<12;i++){

            //    <div class="item col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-3 mb-3">
            //         <a href=`https://www.youtube.com/embed/${itemList[i].resourceId.videoId}` title = `${itemList[i].title}`>
            //             <img src=`${itemList[i].thumbnails.medium.url}` class="img-fluid">
            //                 </a>
            //                 </div>

            //image thumbnail generator
            let div = document.createElement("div");
            div.classList.add("item", "col-lg-3", "col-md-4", "col-sm-6", "col-xs-12", "mt-3", "mb-3");
            let link = document.createElement("a"); 
            link.setAttribute("href", `https://www.youtube.com/watch?v=${itemList[i].resourceId.videoId}`);
            link.setAttribute("title", `${itemList[i].title}`);
            let image = document.createElement("img");
            image.setAttribute("src", `${itemList[i].thumbnails.medium.url}`);
            image.classList.add("img-fluid");
            link.appendChild(image);
            div.appendChild(link);

            gallery.appendChild(div);
                                    
            console.log(div);


            } //for-loop end
    
                
            })
.catch((error)=>{
    console.log('Failed to fetch API', error);
})
 
} //end LocadVideos function

// Invoking the loadVideos function
document.addEventListener("DOMContentLoaded", loadVideos);