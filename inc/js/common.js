jQuery(document).ready(function() {
'use strict';



/* ==============================================
 Contact form checker
 =============================================== */

jQuery("#commentForm").validate({
  submitHandler: function(form) {
   contact_form_submit();
  }
 });


/* ==============================================
 Contact form ajax script
 =============================================== */
function contact_form_submit(){
    jQuery('.contact-button').click(function() {
        var name = jQuery('#cf_name').val();
        var email = jQuery('#cf_email').val();
        var message = jQuery('#cf_message').val();

        
        jQuery.ajax({
          type: "POST",
          url: "send-mail.php",
          data: { cf_name: name, cf_email: email, cf_message: message }
        })
          .done(function( msg ) {
            if(msg == 'sent') {
                jQuery('.message-sent').css('display', 'block');
            } else {
                jQuery('.message-error').css('display', 'block');
            }
          });
    });
}

 /* ==============================================
Checks for mobile devices
=============================================== */
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if(!isMobile.any()) {
    skrollr.init({
        forceHeight: false
    });
}

     var splashdiv = $('.splash-wrap'),
     splashlimit = 10;  /* scrolltop value when opacity should be 0 */
     var divs = $('.splash-content'),
     limit = 600;  /* scrolltop value when opacity should be 0 */
     
    document.addEventListener("touchmove", headerScroll, false);
    document.addEventListener("scroll", headerScroll, false);
     
     
      function headerScroll() {
     var st = $(this).scrollTop();
     
     /* avoid unnecessary call to jQuery function */
     if (st <= limit) {
        divs.css({ 'opacity' : (1 - st/limit) });
        splashdiv.css({ 'height' : (100 - st/splashlimit)+'%' });
     }
     }

 /* ==============================================
Smooth scrolling on link clicking
=============================================== */
    jQuery(function() {
        'use strict';
         jQuery('.navbar a[href*=#]:not([href=#]), .m-splash-image .btn').click(function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
               jQuery('html,body').animate({
                scrollTop: target.offset().top
              }, 1000);
              return false;
            }
          }
        });
      });


 /* ==============================================
background video load
=============================================== */

jQuery(function(){
    'use strict';
    jQuery(".player").mb_YTPlayer();
});



 /* ==============================================
smooth scrolling
=============================================== */
    
jQuery("html").niceScroll({
    zindex: 113,
    cursorwidth: 15,
    autohidemode: false,
    background: '#ededed',
    cursorcolor: '#4abc96',
    cursorborderradius: 0,
    cursorborder: 'none'
});


 /* ==============================================
lightbox
=============================================== */
    
    jQuery('.open-popup-link').magnificPopup({
        type: 'inline',
        midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });


   jQuery('.image-link').magnificPopup({type: 'image'});



 /* ==============================================
Setting slider height on load
=============================================== */
    
    var browserHeight = jQuery(window).height();
    jQuery('.m-splash-image .flexslider li, .splash-image-wrap').css('height', browserHeight);

 /* ==============================================
  Google maps
=============================================== */
    
    var iconBase = 'img/google-marker.png';
    var myLatlng = new google.maps.LatLng(40.7240252, -73.9941299);

    var mapContainer = document.getElementById('map');
    var mapOptions = {
        panControl: false,
        draggable: false,
        zoomControl: false,
        scrollwheel: false,
        scaleControl: false,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.MAP,
        zoom: 18
    };

    var map = new google.maps.Map(mapContainer, mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: iconBase
    });


 /* ==============================================
Navigation Dock
=============================================== */

    var docked = false;
    var menu = jQuery('#l-navigation');
    var init = browserHeight;

    document.addEventListener("touchmove", navDocking, false);
    document.addEventListener("scroll", navDocking, false);

    function navDocking() {
        if (!docked && (menu.offset().top - $(window).scrollTop() < 0))
        {
            jQuery('.l-navigation-wrap').removeClass('menu-padd');
            menu.css({
                position: "fixed",
                top: 0,
            });
            docked = true;
        }
        else if (docked && $(window).scrollTop() <= init)
        {
            jQuery('.l-navigation-wrap').addClass('menu-padd');
            menu.css({
                position: "static",
                top: init + 'px',
            });

            docked = false;
        }
    }


 /* ==============================================
Isotope
=============================================== */
    var $container = $('.l-gallery-posts');

    $container.imagesLoaded(function() {
        // bind isotope to window resize
        $(window).smartresize(function() {
            // jQuery has issues with percentage widths
            // so we'll manually calulate it
            var colW = Math.floor($container.width() * 0.001);

            $container.isotope({
                resizable: false,
                layoutMode: 'sloppyMasonry',
                masonry: {
                    columnWidth: colW
                }
            });
            // trigger resize so isotope layout is triggered
        }).smartresize();
    });

    // filter buttons
    jQuery('.l-gallery-categories li').click(function() {
        jQuery('.l-gallery-categories li').removeClass();
        jQuery(this).addClass('active');
        var selector = jQuery(this).attr('data-filter');
        $container.isotope({filter: selector});
        return false;
    });

});

 /* ==============================================
  Splash screen flex slider
=============================================== */

jQuery(window).load(function() {
    'use strict';
    jQuery('.flexslider-splash').flexslider({
        controlNav: false,
        prevText: "",
        nextText: "",
        slideshow: false,        
    });
});

/*================================================
 Twitter script
 ================================================*/
jQuery(document).ready(function() {
    jQuery('.flexslider-twitter').tweet({
        modpath: 'inc/tweet/twitter/index.php',
        count: 3,
        username: 'envato',
        loading_text: 'loading twitter feed...',
        template: "{avatar}{text}{join}{time}"
    });
});


jQuery(window).load(function() {
    'use strict';
/* ==============================================
Animates page load
=============================================== */
    
jQuery('.page-loader').css('display', 'none');
  jQuery('.l-wrapper').animate({
    opacity: 1
  }, 1000);
        
        
/* ==============================================
Testimonials flexslider
=============================================== */
    jQuery('.flexslider-testimonials').flexslider({
        prevText: "",
        nextText: ""
    });
    
    
/* ==============================================
Twitter flexslider
=============================================== */
    
    jQuery('.flexslider-twitter').flexslider({
        prevText: "",
        nextText: "",
        directionNav: false
    });
    
    
/* ==============================================
Checks for mobile devices
=============================================== */
    
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


// if not mobile waypoint will be turned on
if(!isMobile.any()) {


//setting active menu
jQuery('#page-section').waypoint(function() {
        jQuery('.nav li').removeClass('active');
        jQuery('.nav li:first-child').addClass('active');
});

jQuery('.what-we-do-section').waypoint(function() {
        jQuery('.nav li').removeClass('active');
        jQuery('.nav li:nth-child(2)').addClass('active');
});

jQuery('.m-posts').waypoint(function() {
        jQuery('.nav li').removeClass('active');
        jQuery('.nav li:nth-child(3)').addClass('active');
});

jQuery('.testimonials-paralax').waypoint(function() {
        jQuery('.nav li').removeClass('active');
        jQuery('.nav li:nth-child(4)').addClass('active');
});

jQuery('#skills').waypoint(function() {
        jQuery('.nav li').removeClass('active');
        jQuery('.nav li:nth-child(5)').addClass('active');
});

jQuery('#gallery').waypoint(function() {
        jQuery('.nav li').removeClass('active');
        jQuery('.nav li:nth-child(6)').addClass('active');
});

jQuery('#team').waypoint(function() {
        jQuery('.nav li').removeClass('active');
        jQuery('.nav li:nth-child(7)').addClass('active');
});

jQuery('#contact').waypoint(function() {
        jQuery('.nav li').removeClass('active');
        jQuery('.nav li:nth-child(8)').addClass('active');
});





    //first section
    jQuery('.l-page-section').waypoint(function() {
        jQuery('.l-page-section .round-icon').toggleClass('circle-animate');

    },
            {
                offset: '50%',
                triggerOnce: true
            });

    //what we do section
    jQuery('.what-we-do-section').waypoint(function() {
        jQuery('.what-we-do-section .opacity').toggleClass('opacity-on');
    },
            {
                offset: '50%',
                triggerOnce: true
            });

    //news section
    jQuery('.m-posts').waypoint(function() {

        jQuery('.m-posts .m-news-post').each(function(index) {
            var self = this;
            setTimeout(function() {
                jQuery(self).toggleClass('scale-up');             
            }, index*120);
        });
        
    },
            {
                offset: '80%',
                triggerOnce: true
            });

    //testimonials section
    jQuery('.testimonials-paralax').waypoint(function() {                       
        jQuery('.testimonials-paralax .container').toggleClass('opacity-on');
    },
            {
                offset: '70%',
                triggerOnce: true
            });

    //testimonials section
    jQuery('.l-skills-section').waypoint(function() {
        //easy pie chart    

  
            jQuery('.chart').easyPieChart({
                easing: 'easeOutBounce',
                lineWidth: 16,
                size: 175,
                scaleColor: false,
                barColor: '#34495e',
                trackColor: '#e5e5e5',
                onStep: function(from, to, percent) {
                    jQuery(this.el).find('.percent').text(Math.round(percent));
                }
            });
       
    },
            {
                offset: '50%',
                triggerOnce: true
            });

    //gallery section
    jQuery('.l-gallery-posts').waypoint(function() {      
                                
        jQuery('.l-gallery-posts .opacity').each(function(index) {
            var self = this;
            setTimeout(function() {
                jQuery(self).toggleClass('opacity-on');             
            }, index*120);
        });
    },
            {
                offset: '80%',
                triggerOnce: true
            });

    //team section
    jQuery('.l-team-section').waypoint(function() {      
                                        
        jQuery('.l-team-section .opacity').each(function(index) {
            var self = this;
            setTimeout(function() {
                jQuery(self).toggleClass('opacity-on');             
            }, index*200);
        });
    },
            {
                offset: '50%',
                triggerOnce: true
            });
            
    //map section
    jQuery('.l-map-section').waypoint(function() {      
                                        
        jQuery('.l-map-section .opacity').toggleClass('opacity-on');
    },
        {
            offset: '50%',
            triggerOnce: true
        });
        
    //contact section
    jQuery('.l-contactus-section').waypoint(function() {      
             
        jQuery('.l-contactus-section li').each(function(index) {
            var self = this;
            setTimeout(function() {
                jQuery(self).toggleClass('opacity-on');             
            }, index*170);
        });
        
        jQuery('.l-contactus-section div.form-wrapper').toggleClass('opacity-on');
    },
        {
            offset: '80%',
            triggerOnce: true
        });
    
    //if it is mobile it will only load ellements without waypoints
} else {
    
        
 /* ==============================================
navigation active change
=============================================== */

    jQuery('.nav li a').click(function() {
        jQuery('.nav li').removeClass('active');
        if (jQuery(this).parent().hasClass("arrow-top")) {
            jQuery('.arrow-top').removeClass('active');
            jQuery('.nav li:first-child').addClass('active');
        } else {
            jQuery(this).parent().addClass('active');
        }
    });

    jQuery('.l-logo a').click(function() {
        jQuery('.nav li').removeClass('active');
        jQuery('.nav li:first-child').addClass('active');
    });


    
    //first section
    jQuery('.l-page-section .round-icon').toggleClass('circle-animate');

    //what we do section
    jQuery('.what-we-do-section .opacity').toggleClass('opacity-on');

    //news section
        jQuery('.m-posts .m-news-post').each(function(index) {
            var self = this;
            setTimeout(function() {
                jQuery(self).toggleClass('scale-up');             
            }, index*120);
        });


        //testimonials section
        jQuery('.testimonials-paralax .container').toggleClass('opacity-on');


        //easy pie chart    
            jQuery('.chart').easyPieChart({
                easing: 'easeOutBounce',
                lineWidth: 16,
                size: 175,
                scaleColor: false,
                barColor: '#34495e',
                trackColor: '#e5e5e5',
                onStep: function(from, to, percent) {
                    jQuery(this.el).find('.percent').text(Math.round(percent));
                }
            });


    //gallery section
        jQuery('.l-gallery-posts .opacity').each(function(index) {
            var self = this;
            setTimeout(function() {
                jQuery(self).toggleClass('opacity-on');             
            }, index*120);
        });


    //team section
        jQuery('.l-team-section .opacity').each(function(index) {
            var self = this;
            setTimeout(function() {
                jQuery(self).toggleClass('opacity-on');             
            }, index*200);
    });
            
    //map section
        jQuery('.l-map-section .opacity').toggleClass('opacity-on');
        
    //contact section     
        jQuery('.l-contactus-section li').each(function(index) {
            var self = this;
            setTimeout(function() {
                jQuery(self).toggleClass('opacity-on');             
            }, index*170);
        });
        
        jQuery('.l-contactus-section div.form-wrapper').toggleClass('opacity-on');
    }
});