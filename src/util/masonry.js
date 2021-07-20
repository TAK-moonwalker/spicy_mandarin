import Masonry from 'masonry-layout';

var grid = document.querySelector('#grid');

function initMasonry(){
var msnry = new Masonry( '#grid', {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true
  });
} 

  function docReady(callback) {
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(callback, 1);
    } else {
        document.addEventListener("DOMContentLoaded", callback);
    }
}    

docReady(()=>{
initiMasonry();
})
