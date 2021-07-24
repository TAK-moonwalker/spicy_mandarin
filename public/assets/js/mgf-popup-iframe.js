$(document).ready(function(){
    $('#videoRow').magnificPopup({
      delegate: 'a', // child items selector, by clicking on it popup will open
      type: 'iframe',
      // other options
      iframe: {
         markup: '<div class="mfp-iframe-scaler">'+
                    '<div class="mfp-close"></div>'+
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                    '<div class="mfp-title">Spicy Mandarin</div>'+
                  '</div>'
      },
      callbacks: {
        markupParse: function(template, values, item) {
         values.title = item.el.attr('title');
        }
    }
}
    );
    })
  