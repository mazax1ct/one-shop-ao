//функция навешивания класса на шапку
var resize_scroll = function(e) {
  var h = $(".header");
  if($(window).scrollTop() > 1) {
    h.addClass("scrolled");
  } else {
    h.removeClass("scrolled");
  }
};

//расширение для select2
(function($) {

	var Defaults = $.fn.select2.amd.require('select2/defaults');

  $.extend(Defaults.defaults, {
  	dropdownPosition: 'auto'
  });

 	var AttachBody = $.fn.select2.amd.require('select2/dropdown/attachBody');

  var _positionDropdown = AttachBody.prototype._positionDropdown;

  AttachBody.prototype._positionDropdown = function() {

    var $window = $(window);

		var isCurrentlyAbove = this.$dropdown.hasClass('select2-dropdown--above');
		var isCurrentlyBelow = this.$dropdown.hasClass('select2-dropdown--below');

		var newDirection = null;

		var offset = this.$container.offset();

		offset.bottom = offset.top + this.$container.outerHeight(false);

		var container = {
    		height: this.$container.outerHeight(false)
		};

    container.top = offset.top;
    container.bottom = offset.top + container.height;

    var dropdown = {
      height: this.$dropdown.outerHeight(false)
    };

    var viewport = {
      top: $window.scrollTop(),
      bottom: $window.scrollTop() + $window.height()
    };

    var enoughRoomAbove = viewport.top < (offset.top - dropdown.height);
    var enoughRoomBelow = viewport.bottom > (offset.bottom + dropdown.height);

    var css = {
      left: offset.left,
      top: container.bottom
    };

    // Determine what the parent element is to use for calciulating the offset
    var $offsetParent = this.$dropdownParent;

    // For statically positoned elements, we need to get the element
    // that is determining the offset
    if ($offsetParent.css('position') === 'static') {
      $offsetParent = $offsetParent.offsetParent();
    }

    var parentOffset = $offsetParent.offset();

    css.top -= parentOffset.top
    css.left -= parentOffset.left;

    var dropdownPositionOption = this.options.get('dropdownPosition');

		if (dropdownPositionOption === 'above' || dropdownPositionOption === 'below') {

    		newDirection = dropdownPositionOption;

    } else {

        if (!isCurrentlyAbove && !isCurrentlyBelow) {
      			newDirection = 'below';
    		}

    		if (!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove) {
      		newDirection = 'above';
    		} else if (!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove) {
      		newDirection = 'below';
    		}

    }

    if (newDirection == 'above' ||
        (isCurrentlyAbove && newDirection !== 'below')) {
      css.top = container.top - parentOffset.top - dropdown.height;
    }

    if (newDirection != null) {
      this.$dropdown
        .removeClass('select2-dropdown--below select2-dropdown--above')
        .addClass('select2-dropdown--' + newDirection);
      this.$container
        .removeClass('select2-container--below select2-container--above')
        .addClass('select2-container--' + newDirection);
    }

    this.$dropdownContainer.css(css);

  };

})(window.jQuery);

$(document).ready(function () {
  //запуск функции навешивания класса на шапку
  resize_scroll();

  //кастомный скролл для контейнера таблиц
  $('.js-custom-scroll').each(function(index, element) {
    new SimpleBar(element, { autoHide: false })
  });

  //кастомный селект
	$('.js-select').each(function() {
   var $p = $(this).closest('.select-wrapper');
   $(this).select2({
		 minimumResultsForSearch: Infinity,
     dropdownPosition: 'below',
     dropdownParent: $p
   });
	});

  //слайдер картинок
  if ($('.js-slider').length) {
    $('.js-slider').each(function (index, value) {

      var slickElement = $(this);

      var status = slickElement.parent().find('.js-slider-count');

      var nav = slickElement.parent().find('.js-slider-nav');

      slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        var sum = slick.slideCount;
        if(i < 10) {
          i = '0' + i;
        }

        if(sum < 10) {
          sum = '0' + sum;
        }

        status.html('<span class="slider-block__counter-current">'+i+'</span>' + ' <span class="slider-block__counter-separator">/</span> <span class="slider-block__counter-all"> ' + sum + '</span>');
      });

      slickElement.slick({
        auto: false,
        mobileFirst: true,
        slidesToShow: 1,
        infinite: false,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev slick-arrow" title="Назад"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider_arrow_left"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next slick-arrow" title="Вперед"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider_arrow_right"/></svg></button>',
        appendArrows: nav,
        dots: false,
        variableWidth: true
      });
    });
  }

  //запуск плавающего левого меню на контентных страницах
  if ($(".js-sticky-block").length) {
    if ($("body").width() >= 1280) {
      $(".js-sticky-block").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block").stick_in_parent({
          offset_top: 170
        });

        //навигация по якорям
        if ($(".js-scroll-spy").length) {
          $(".js-scroll-spy").ddscrollSpy({
            scrolltopoffset: -170
          });
        }
      }, 100);
    }

    //если блок для контента пустой, открепляем плавающее левое меню
    if ($(".js-content-with-sticky").length) {
      if ($('.js-content-with-sticky').html().trim() === '') {
        $(".js-sticky-block").trigger("sticky_kit:detach");
      }
    }
  }

  //слайдер больших картинок по 1
  if ($('.js-simple-slider').length) {
    $('.js-simple-slider').each(function (index, value) {

      var slickElement = $(this);

      var status = slickElement.parent().find('.js-slider-count');

      var nav = slickElement.parent().find('.js-slider-nav');

      slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        var sum = slick.slideCount;
        if(i < 10) {
          i = '0' + i;
        }

        if(sum < 10) {
          sum = '0' + sum;
        }

        status.html('<span class="simple-slider-block__counter-current">'+i+'</span>' + ' <span class="simple-slider-block__counter-separator">/</span> <span class="simple-slider-block__counter-all"> ' + sum + '</span>');
      });

      slickElement.slick({
        auto: false,
        mobileFirst: true,
        slidesToShow: 1,
        infinite: false,
        arrows: true,
        prevArrow: '<button type="button" class="slick-prev slick-arrow" title="Назад"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider_arrow_left"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next slick-arrow" title="Вперед"><svg class="slick-arrow__icon" aria-hidden="true"><use xlink:href="#slider_arrow_right"/></svg></button>',
        appendArrows: nav,
        dots: false
      });
    });
  }
});

//перезапуск функции навешивания класса на шапку при скролле и ресайзе
$(window).on("scroll", resize_scroll).on("resize", resize_scroll);

//открытие/закрытие главного меню
var targetElement = $('.header__menus');

$(document).on('click', '.js-menu-toggler', function () {
  $(this).toggleClass("is-active");
  $('.header__menus').toggleClass('is-open');
  $('.header__user-link').toggle();
  $('.header__user-links-separate').toggle();
  if($(this).hasClass('is-active')) {
    bodyScrollLock.disableBodyScroll(targetElement);
  } else {
    bodyScrollLock.enableBodyScroll(targetElement);
  }
  return false;
});

//открепляем и перезапускаем прилипающий блок при резайзе
$(window).resize(function() {
  if ($(".js-sticky-block").length) {
    if ($("body").width() >= 1280) {
      $(".js-sticky-block").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block").stick_in_parent({
          offset_top: 170
        });

        //навигация по якорям в новости
        if ($(".js-scroll-spy").length) {
          $(".js-scroll-spy").ddscrollSpy({
            scrolltopoffset: -170
          });
        }
      }, 100);
    }
  }

  if($('body').width() > 1260) {
    if ($(".catalog-description td").length) {
      equalHeight('.catalog-description td');
    }
  }
});

//открепляем и перезапускаем прилипающий блок при повороте устройства
$(window).on("orientationchange", function(event) {
  if ($(".js-sticky-block").length) {
    if ($("body").width() >= 1280) {
      $(".js-sticky-block").trigger("sticky_kit:detach");
      setTimeout(function() {
        $(".js-sticky-block").stick_in_parent({
          offset_top: 170
        });

        //навигация по якорям в новости
        if ($(".js-scroll-spy").length) {
          $(".js-scroll-spy").ddscrollSpy({
            scrolltopoffset: -170
          });
        }
      }, 100);
    }
  }

  if($('body').width() > 1260) {
    if ($(".catalog-description td").length) {
      equalHeight('.catalog-description td');
    }
  }
});

//кнопка наверх в каталоге
$(document).on('click', '.js-go-top', function () {
  $('html, body').animate({scrollTop:0}, '300');
  return false;
});

$(document).on('click', '.js-catalog-view', function () {
  $('.js-catalog-view').removeClass('is-active');
  $(this).addClass('is-active');
  $('.catalog-list').removeClass('catalog-list--type_1').removeClass('catalog-list--type_2').removeClass('catalog-list--type_3');
  $('.catalog-list').addClass($(this).attr('data-target'));
  return false;
});
