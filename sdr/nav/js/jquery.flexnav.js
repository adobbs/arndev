/*global jQuery */
/*!	
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
	        'breakpoint': '800',
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
	            $this.show();
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
	        $('html').addClass('flexNav-touch');
	    } else {
	        $('html').addClass('flexNav-no-touch');
	    }

	    // Toggle for nav menu
	    $('.menu-button').click(function() {
	     		$this.toggle();
	     		$('.secondary-menu').hide();
	        $('.menu-button').text('Menu');
	        $('.back-button').hide();
	        $('#mobile-nav').hide();
	    });
	
	    // Closes nav menu after links clicked/touched
	    $this.find('a').click(function() {
	        $this.hide();
	    });
	
	    // Toggle click for secondary-menus on touch and or small screens
	    $('.item-with-ul').click(function() {
	        $(this).find('.secondary-menu').slideToggle(settings.animationSpeed);
	        var menuText = $(this).find('.link-with-ul').text();
	        $('.menu-button').text(menuText);
	        $('.back-button').toggle();
	        $('#nav').hide();
	        $('#mobile-nav').show();
	    });

	    $('.secondary-item-with-ul').click(function() {
	        $(this).find('.secondary-menu').slideToggle(settings.animationSpeed);
	    });


	    $('.back-button').click(function() {
	    	$('.secondary-menu').hide();
	    	$('.menu-button').text('Menu');
	    	$('.back-button').hide();
	    	$('#mobile-nav').hide();
	    	$this.show();
	    });

	    // Call on resize.
	    $(window).on('resize', resizer);

	};

})(jQuery);