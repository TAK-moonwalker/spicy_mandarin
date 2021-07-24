const loadYTVideos = (api_path) => {
    
    //DOM element
    const gallery = document.querySelector("#video-container")
    const titleIframe = document.querySelector(".mfp-title")
    const urlDev = `http://localhost:3030/api/videos/${api_path}`
    const urlPro = `https://tak-spicymandarin.herokuapp.com/api/videos/${api_path}`

   //Fetch videos from API
fetch(urlDev, {
        method: 'get',
          dataType: 'json',
    })
    .then(response => response.json())
    .then((response)=>{
        
            const itemList = response.items;

            console.log(itemList);
            console.log(itemList[0].title);
           for(let i=0; itemList.length >i ;i++){
            if (itemList[i].resourceId.videoId == "tx8x_f7pBhQ" || null || undefined) { continue; }
//image thumbnail generator

// <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 m-2 item">
//  <a href="https://www.youtube.com/watch?v=YjSOdt0bMvk" target="blank"><img src="https://i.ytimg.com/vi/-iA0P7ilnuU/mqdefault.jpg"></a>
//      <p class="title">Spicy Mandarin - Spicy Series - Lesson 01: Pillow Fight</p>
//   </div>

    const mainDiv = document.createElement("div");
    mainDiv.className = "item";
    mainDiv.classList.add = ("col-lg-3", "col-md-4", "col-sm-6", "col-xs-12", "m-2");
    const link = document.createElement("a");
    link.className = "video";
    link.setAttribute("href", `https://www.youtube.com/watch?v=${itemList[i].resourceId.videoId}`);
    const image = document.createElement("img");
    image.setAttribute("src", `${itemList[i].thumbnails.medium.url}`);
    const p = document.createElement("p");
    p.className = "title";
    const title = document.createTextNode(`${itemList[i].title}`);
    p.appendChild(title);


    link.appendChild(image);
    mainDiv.appendChild(link);
    mainDiv.appendChild(p);
    gallery.appendChild(mainDiv);

               
      //console.log(mainDiv)

           } //for-loop end
            
            
    
                
            })
            
.catch((error)=>{
    console.log('Failed to fetch API', error);
})
 
} //end LocadVideos function

//export default loadYTVideos;  //export module

// Invoking the loadVideos function
//document.addEventListener("DOMContentLoaded", ()=>{
//   loadYTVideos("bts");
// });