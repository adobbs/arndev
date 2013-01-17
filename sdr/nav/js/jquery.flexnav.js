/*global jQuery */
/* Code by Andrew Dobbs is based on:
*	
* FlexNav.js 0.3
*
* Copyright 2012, Jason Weaver http://jasonweaver.name
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
*
* Date: Sunday July 8
*/

(function($) {
	$.fn.flexNav = function(options) {
		var settings = $.extend({
			'breakpoint': '700',
			'animationSpeed': 'fast'
		},
		options);

		var $this = $(this);

		var resizer = function() {
			if ($(window).width() < settings.breakpoint) {
				$("body").removeClass("lg-screen").addClass("sm-screen");
			}
			else {
				$("body").removeClass("sm-screen").addClass("lg-screen");
			}

			if ($(window).width() >= settings.breakpoint) {
				$('.primary-navigation').show();
				$('.tertiary-list').hide();
				$('.menu-text').text('Menu').css("margin","0");
				$('.back-button').hide();
				$('.secondary-navigation').hide();
				$('.secondary-item').removeClass('arrow-up').addClass('arrow-down');
			}

			if ($(window).width() < settings.breakpoint && is_touch_device()) {
			 	$('.secondary-list').hide();
			}
		};

		// Call once to set.
		resizer();

		// Function for testing touch screens
		function is_touch_device() {
			return !! ('ontouchstart' in window);
		}

		// Set class on html element for touch/no-touch
		if (is_touch_device()) {
			console.log("touch device detected");
			$('html').addClass('flexNav-touch');
		} else {
			console.log("touch device NOT detected");
			$('html').addClass('flexNav-no-touch');
		}

		// Toggle for nav menu
		$('.menu-button').click(function() {
			$this.toggle();
			$('.tertiary-list').hide();
			$('.menu-text').text('Menu').css("margin","0");
			$('.back-button').hide();
			$('.secondary-navigation').hide();
			$('.secondary-item').removeClass('arrow-up').addClass('arrow-down');
		});

		$('.back-button').click(function() {
			$('.tertiary-list').hide();
			$('.menu-text').text('Menu').css("margin","0");
			$('.back-button').hide();
			$('.secondary-navigation').hide();
			$('.secondary-item').removeClass('arrow-up').addClass('arrow-down');
		});		

		// Closes nav menu after links clicked/touched
		$this.find('a').click(function() {
			$this.hide();
		});

		// Toggle click for tertiary-list on touch and or small screens
		$('.primary-item').click(function() {
			if ($(window).width() < settings.breakpoint) {
				$(this).find('.tertiary-list').slideToggle(settings.animationSpeed);
				var menuText = $(this).find('span').text();
				$('.menu-text').text(menuText).css("margin","2em");
				$('.back-button').show();
				$('.primary-navigation').hide();
				$('.secondary-navigation').show();
			} else if ($(window).width() >= settings.breakpoint && is_touch_device()) {
				$(this).find('.secondary-list').toggle();
			}
		});


		$('.secondary-item').click(function() {
			$(this).find('.tertiary-list').slideToggle(settings.animationSpeed);
			if ($(this).hasClass('arrow-down')) {
				$(this).removeClass('arrow-down').addClass('arrow-up');
			} else {
				$(this).removeClass('arrow-up').addClass('arrow-down');				
			}
		});

		// Call on resize.
		$(window).on('resize', resizer);
	};
})(jQuery);