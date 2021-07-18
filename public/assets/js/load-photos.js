function loadPhotos(){

//DOM ELEMNT :
const gridGallery = document.querySelector("#photo-items")

//Fetch photos :
fetch('http://localhost:3030/api/images', {
        method: 'get',
          dataType: 'json'
    })
.then(response => response.json())
.then((response)=>{

    //console.log(response);
  let photoGallery = "";

for(i=0;i<12;i++){

    photoGallery += `<div class="grid-item"><img src="/assets/gallery-images/${response[i]}"></div>`
    console.log(response[i]);
}

gridGallery.innerHTML+=photoGallery;


})
.catch((error)=>{
    console.log('Failed to fetch photos', error)
})



}
// Invoking the loadVideos function
document.addEventListener("DOMContentLoaded", loadPhotos);
