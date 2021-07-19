// external js: masonry.pkgd.js, imagesloaded.pkgd.js

// init Masonry
$(document).ready(function() {

    $('#grid').masonry({
    itemSelector: '.grid-item',
    columnWidth:  '.grid-sizer'
    });
})

  // layout Masonry after each image loads
  $grid.imagesLoaded().progress( function() {
    $grid.masonry();
  });  