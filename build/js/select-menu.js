(function( $ ) {
  $.fn.selectbox = function() {
    $('.selectbox__value').click(function() {
      $(this).closest(".js-selectbox").toggleClass('is-open');
    });
    $('.selectbox__link').click(function() {
      var href = $(this).attr('href');
      $(this).closest(".js-selectbox").find('.selectbox__value').text($(this).text());
      $(this).closest(".js-selectbox").removeClass('is-open');
      $('html,body').stop().animate({
        scrollTop: $(href).offset().top - 70
      }, 1000);
      return false;
    });
  };
})( jQuery );
