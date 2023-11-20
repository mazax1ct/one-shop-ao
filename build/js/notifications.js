$(document).ready(function () {
  if ($('.js-notifications').length) {
    $('.js-notifications').slick({
      auto: false,
      mobileFirst: true,
      slidesToShow: 2,
      infinite: true,
      arrows: true,
      prevArrow: '<button type="button" class="slick-prev slick-arrow" title="Назад"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider_arrow_left"/></svg></button>',
      nextArrow: '<button type="button" class="slick-next slick-arrow" title="Вперед"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider_arrow_right"/></svg></button>',
      appendArrows: '.js-notifications-arrows',
      dots: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 1279,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 1399,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5
          }
        }
      ]
    });
  }
});
