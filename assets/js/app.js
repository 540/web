$(document).foundation();

(function($){
  "use strict";

  $(document).ready(function() {

    setTimeout(function() {
      $('.box').each(function() {
        this.scrollTop = 0;
      });
    }, 500);


    var sectionAnimation = function(slug) {
      var delay = 500;
      var sections = $(".box");

      $(this).addClass('active');
      $(this).animate({ width: "100%", height: "100%" }, delay);
      sections.not(this).animate({ width: "0%",height: "0%" }, delay, function() { $(this).addClass('inactive') });
      $(this).css('overflow', 'auto');

      $('#logo img').hide();


      switch(slug) {
        case "about":
          var left = "150%";
          var top = "150%";
          var backClass = "right-bottom";
          break;
        case "service":
          var left = "-50%";
          var top = "150%";
          var backClass = "left-bottom";
          break;
        case "work":
          var left = "150%";
          var top = "-50%";
          var backClass = "right-top";
          break;
        case "blog":
          var left = "-50%";
          var top = "-50%";
          var backClass = "left-top";
          break;
      }

      $('#logo').animate({ left: left, top: top }, delay, function() {
        $('#back').removeClass('right-bottom left-bottom right-top left-top').addClass(backClass).show();
      });

    }



    $('.box').click(function() {
      if ($(this).hasClass('active')) { return; }

      sectionAnimation.apply($(this), [$(this).attr('id')]);

      // hack fix for the slick testimonials slider
      var slicks = $('.items');

      for(var i = 0; i < slicks.length; i++) {
        var slick = slicks[i];
        setTimeout(function() {
          slick.slick.setPosition();
        }, 500)
      }

      setTimeout(function() {
        masonryGallery("#masonry-gallery");
      }, 500);

      return false;
    });

    $('#back').click(function(e) {
      e.preventDefault();

      var delay = 500;
      var sections = $(".box");
      var current_active_section = $('.box.active');

      current_active_section.removeClass('active');
      current_active_section.animate({ width: "50%", height: "50%" }, delay);
      sections.not(current_active_section).removeClass('inactive').animate({ width: "50%",height: "50%" }, delay);
      current_active_section.css('overflow', 'hidden');

      window.location.hash = 'home';

      $('#logo img').show();
      $('#back').hide();
      $('#contact .contact-info').hide();
      $('#logo').animate({ left: "50%", top: "50%" }, delay);
      $('.box').each(function() {
        this.scrollTop = 0;
      });

      return false;
    });


    $('.items').slick({
      autoplay: true,
      pauseOnHover: false,
      dots: true,
      speed: 2000,
      arrows: false
    });

    $('.clients').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    });

    $('#contact .handle').click(function() {
      $('#contact .contact-info').slideToggle(400);
      return false;
    });

    $('.let-us-talk').click(function() {
      $('#contact .contact-info').slideToggle(400);
      return false;
    });

    var masonryGallery = function(sel) {

      var $ctx = $(sel);
      var items = $('.gallery li', $ctx);
      var gutter = $ctx.data('gutter');

      if ( !gutter ) { gutter = 0 };

      for( var i = 0; i < items.length; i++ ) {
        var item = items[i];
        $(item).data('masonry-id', i);
      }

      var msnry = new Masonry($('.gallery', $ctx)[0], { itemSelector: 'li', gutter: gutter, isInitLayout: false, columnWidth: ".gallery li:not(.wide)" });

      window.msnry = msnry;

      $('.gallery', $ctx).imagesLoaded( function() {
        msnry.layout();
      });

      $('.gallery-nav ul li a', $ctx).click(function() {

        // disable filter
        // if( $('.gallery-nav', $ctx).hasClass('disabled') ) return false;

        // $('.gallery-nav', $ctx).addClass('disabled');

        $('.gallery-nav ul li').removeClass('current');
        $(this).closest('li').addClass('current');

        var cat = $(this).attr('data-cat');

        var gallery = $('.gallery-nav').closest('.masonry-gallery').find('ul.gallery');

        if (cat === 'all') {
          var exists = $('.gallery li', $ctx);
          var elems = [];

          for( var i = 0; i < items.length; i++ ) {
            var item = items[i];
            var skip = false;

            for(var j = 0; j < exists.length; j++ ) {
              var exist = exists[j];
              if ($(item).data('masonry-id') == $(exist).data('masonry-id')) {
                skip = true;
              }
            }

            if (!skip) {
              ($('.gallery', $ctx)[0]).appendChild($(item)[0]);
              elems.push($(item)[0]);
            }
          }
          msnry.prepended(elems);

        } else {
          var lis = $('li', gallery);

          for(var i = 0; i < lis.length; i++) {
            var li = lis[i];

            if (!$(li).hasClass(cat)) {
              msnry.remove($(li));
            }
          }

          var exists = $('.gallery li', $ctx);
          var elems = [];

          for( var i = 0; i < items.length; i++) {
            var item = items[i];
            var skip = false;

            for( var j = 0; j < exists.length; j++) {
              var exist = exists[j];

              if ($(item).data('masonry-id') == $(exist).data('masonry-id')) {
                skip = true;
              }
            }


            if ( $(item).hasClass(cat) && !skip) {
              ($('.gallery', $ctx)[0]).appendChild($(item)[0]);
              elems.push($(item)[0]);
            }
          }

          msnry.appended(elems);

        }

        msnry.layout();


        // enable filter
        // setTimeout(function() {
        //   $('.gallery-nav', $ctx).removeClass('disabled');
        // }, 500);

        return false;

      });

    }


    $('.gallery a').click(function() {
      // window.location = $(this).attr('href');
    });


    // masonryGallery('#masonry-gallery')


    $('.fadeinleft, .fadeinright, .fadein, .popin, .moveup, .diamond-milestones-wrapper').appear(function() {
      var delay = $(this).data('delay');
      var that = this;

      setTimeout(function() {
        $(that).addClass('appear');
      }, delay)

    });

    $('.slides').slick({
      autoplay: true,
      pauseOnHover: false,
      dots: true,
      speed: 1500,
      arrows: false
    });


    $('form#contact_form').validate({
      messages: { },
      submitHandler: function(form) {
        $.ajax({
          type: 'POST',
          url: 'send.php',
          data: $(form).serialize(),
          success: function(data) {
            if(data.match(/success/)) {
              $(form).trigger('reset');
              $('#thanks').show().fadeOut(5000);
            }
          }
        });
        return false;
      }
    });


    // console.log(window.location.hash);

    switch(window.location.hash) {
      case "#blog-section":
        $('#blog').click();
        setTimeout(function() {
          $('body').removeClass('hide');
        }, 500);
        break;
      case "#work-section":
        $('#work').click();
        setTimeout(function() {
          $('body').removeClass('hide');
        }, 500);
        break;
      case "#about-section":
        $('#about').click();
        setTimeout(function() {
          $('body').removeClass('hide');
        }, 500);
        break;
      case "#service-section":
        $('#service').click();
        setTimeout(function() {
          $('body').removeClass('hide');
        }, 500);
        break;
      default:
        $('body').removeClass('hide');
    }

  });
})(jQuery);

