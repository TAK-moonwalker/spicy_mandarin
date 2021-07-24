function loadPhotos(){

//DOM ELEMNT :
const gridGallery = document.querySelector("#grid")

const urlDev = 'http://localhost:3030/api/images'
const urlPro = 'https://tak-spicymandarin.herokuapp.com/api/images'

//Fetch photos :
fetch(urlDev, {
        method: 'get',
          dataType: 'json'
    })
.then(response => response.json())
.then((response)=>{

    console.log(response);
//   let photoGallery = "";

for(i=0;i<12;i++){

let div = document.createElement("div") //.setAttribute("class", "grid-item");
let img = document.createElement("img") //.setAttribute("src", `/assets/gallery-images/${response[i]}`);
div.className = "grid-item";
img.setAttribute("src", `assets/gallery-images/${response[i]}`)
console.log(response[i]);
div.appendChild(img);

if(div === null || undefined) { continue; }

gridGallery.appendChild(div);

console.log(div);


}  //end for-loop



})
.catch((error)=>{
    console.log('Failed to fetch photos', error)
})



}
// Invoking the loadVideos function
// document.addEventListener("DOMContentLoaded", loadPhotos);
