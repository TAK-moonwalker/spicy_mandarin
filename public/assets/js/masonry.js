// external js: masonry.pkgd.js, imagesloaded.pkgd.js

// init Masonry
$(document).ready(function() {
   
    var $grid =  $('#grid').masonry({
    itemSelector: '.grid-item',
    columnWidth:  '.grid-sizer'
    })

    $grid.imagesLoaded().progress( function() {
      $grid.masonry();
    });
})

  // layout Masonry after each image loads
  // $grid.imagesLoaded().progress( function() {
  //   $grid.masonry();
  // });  
  