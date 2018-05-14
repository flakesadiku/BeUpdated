/**
 * @fileoverview Slick fullscreen slider
 *
 * @author Alex Pivtorak <alex.pivtorak@gmail.com>
 * @version 0.7
 */

'use strict';

jQuery(function($) {
    var el, set, timeRemain, sliderContinue;
    var Application = {
        settings: {
            sliderAutoplaySpeed: 5000,
            sliderSpeed: 1200
        },
        elements: {
            slider: $('.slider-wrapper'),
            slickAllThumbs: $('.slick-dots button'),
            slickActiveThumb: $('.slick-dots .slick-active button'),
        },

        init: function() {
            set = this.settings;
            el = this.elements;


            this.slider();

        },

        /**
         * Slider
         */
        slider: function() {
            el.slider.on('init', function() {
                $(this).find('.slick-dots button').text('');
                var $firstAnimatingElements = $('div.slide:first-child').find('[data-animation]');
                Application.doAnimations($firstAnimatingElements);
                Application.dotsAnimation();

            });
            el.slider.slick({
                arrows: true,
                dots: false,
                autoplay: false,
                autoplaySpeed: set.sliderAutoplaySpeed,
                fade: true,
                speed: set.sliderSpeed,
                pauseOnHover: false,
                pauseOnDotsHover: true
            });

            $('.slick-dots').hover(
                function() {
                    var trackWidth = $('.slick-dots .slick-active button').width();
                    $('.slick-dots .slick-active button').stop().width(trackWidth);
                    el.slider.slick('slickPause');
                    clearTimeout(sliderContinue);
                },
                function() {
                    Application.dotsAnimation(timeRemain);
                    var trackWidth = $('.slick-dots .slick-active button').width();


                    sliderContinue = setTimeout(function() {
                        el.slider.slick('slickNext');
                        el.slider.slick('slickPlay');
                    }, timeRemain);
                }
            );

            el.slider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
                $('.slick-dots button').stop().width(0);
                var $animatingElements = $('div.slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
                Application.doAnimations($animatingElements);
            });

            el.slider.on('afterChange', function() {
                $('.slick-dots button').width(0);
                Application.dotsAnimation();
            });

        },
        /**
         *
         * @param remain {number}
         */
        dotsAnimation: function(remain) {

            if (remain) {
                var newDuration = remain;
            } else {
                var newDuration = set.sliderAutoplaySpeed;
            }

            $('.slick-dots .slick-active button').animate({ width: '100%' },
                {
                    duration: newDuration,
                    easing: 'linear',
                    step: function(now, fx) {
                        var timeCurrent = Math.round((now*set.sliderAutoplaySpeed)/100);
                        timeRemain = set.sliderAutoplaySpeed - timeCurrent;
                    }
                }
            );
        },
        doAnimations: function(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        elements.each(function() {
            var $this = $(this);
            var $animationDelay = $this.data('delay');
            var $animationType = 'animated ' + $this.data('animation');
            $this.css({
                'animation-delay': $animationDelay,
                '-webkit-animation-delay': $animationDelay
            });
            $this.addClass($animationType).one(animationEndEvents, function() {
                $this.removeClass($animationType);
            });
        });
      },
    };

    Application.init();


    $(window).load(function() {
      $('.slider-wrapper .slide-image').height($(window).height());
    });

    $(window).resize(function() {
      $('.slider-wrapper .slide-image').height($(window).height());
    });

});
