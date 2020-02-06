(function ($) {
"use strict";
// TOP Menu Sticky
$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 400) {
    $("#sticky-header").removeClass("sticky");
    $('#back-top').fadeIn(500);
	} else {
    $("#sticky-header").addClass("sticky");
    $('#back-top').fadeIn(500);
	}
});

$(document).ready(function(){

  // mobile_menu
  var menu = $('ul#navigation');
  if(menu.length){
    menu.slicknav({
      prependTo: ".mobile_menu",
      closedSymbol: '+',
      openedSymbol:'-'
    });
  };


  // init Isotope
  var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    percentPosition: true,
    masonry: {
      // use outer width of grid-sizer for columnWidth
      columnWidth: 1
    }
  });

  // wow js
  new WOW().init();

  // counter 
  $('.counter').counterUp({
    delay: 10,
    time: 10000
  });

/* magnificPopup img view */
$('.popup-image').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

/* magnificPopup img view */
$('.img-pop-up').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

/* magnificPopup video view */
$('.popup-video').magnificPopup({
	type: 'iframe'
});


  // scrollIt for smoth scroll
  $.scrollIt({
    upKey: 38,             // key code to navigate to the next section
    downKey: 40,           // key code to navigate to the previous section
    easing: 'linear',      // the easing function for animation
    scrollTime: 850,       // how long (in ms) the animation takes
    activeClass: 'active', // class given to the active nav element
    onPageChange: function(pageIndex) {
        document.body.classList.remove('panel-open');
        document.querySelector('[data-js="menu-toggle"]').classList.remove('open');
    },    // function(pageIndex) that is called when page is changed
    topOffset: -80           // offste (in px) for fixed top navigation
  });

  // scrollup bottom to top
  $.scrollUp({
    scrollName: 'scrollUp', // Element ID
    topDistance: '4500', // Distance from top before showing element (px)
    topSpeed: 300, // Speed back to top (ms)
    animation: 'fade', // Fade, slide, none
    animationInSpeed: 200, // Animation in speed (ms)
    animationOutSpeed: 200, // Animation out speed (ms)
    scrollText: '<i class="fa fa-angle-double-up"></i>', // Text for element
    activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
  });


  //project-active
if (document.getElementById('default-select')) {
  $('select').niceSelect();
}

});

// resitration_Form
$(document).ready(function() {
	
  var wow = new WOW(
    {
      boxClass:     'wow',      // animated element css class (default is wow)
      animateClass: 'animated', // animation css class (default is animated)
      offset:       0,          // distance to the element when triggering the animation (default is 0)
      mobile:       true,       // trigger animations on mobile devices (default is true)
      live:         true,       // act on asynchronously loaded content (default is true)
      callback:     function(box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null,    // optional scroll container selector, otherwise use window,
      resetAnimation: true,     // reset animation on end (default is true)
    }
  );
  wow.init();

  // ------ Burger menu --------- //
  var menuToggle = document.querySelector('[data-js="menu-toggle"]');


  menuToggle.addEventListener('click', function () {
    document.body.classList.toggle('panel-open');
    menuToggle.classList.toggle('open');
  });

  var closePanel = document.querySelector('[data-js="hidden-panel-close"]');

  closePanel.addEventListener('click', function () {
    document.body.classList.remove('panel-open');
    menuToggle.classList.remove('open');
  });

  const player = new Plyr('#player');
  player.poster = './img/coverart.jpg';

});
var options = [
   { label: 'Adam', data: 'AD' },
   { label: 'Tim', data: 'TM' }
];

async function getCountries() {
  const data = await fetch('https://api.teleport.org/api/countries/');

  const response = await data.json();
  let countries = response._links['country:items'];
  const newObj = []
  countries.map(c => {
    const {
      name: value, 
      name: label, 
      ...rest
    } = c;

    newObj.push({ value, label, ...rest})
  })

  return newObj;
}

async function getCities(city) {
  const data = await fetch(`https://api.teleport.org/api/cities/?search=${city}`);

  const response = await data.json();
  let cities = response._embedded["city:search-results"];
  const newObj = []
  cities.map(c => {
    const {
      matching_full_name: value, 
      matching_full_name: label, 
      ...rest
    } = c;

    newObj.push({ value, label, ...rest})
  })

  return newObj;
}


$(document).ready(function($) {
  var Body = $('body');
  Body.addClass('preload-site');
});
$(window).load(async function() {
  const countries = await getCountries();
setTimeout(function() {
  $('.overlay-loading').fadeOut();
  $('body').removeClass('preload-site');
  $('.plyr').addClass('animated zoomIn delay-1s');
  $('#myModal').modal().unbind();
  $('body').addClass('animated fadeIn');

  // $('#country').autocomplete({
  //   source: availableTags,
  // });
  var timer = 1;
  // $('.streaming-img').each(function() {
  //   timer += .2;
  //   setTimeout(() => {
  //     console.log($(this));
  //     $(this).addClass('animated fadeInUp')
  //   }, timer * 1000)

  // })
},1500);
  var input = document.getElementById("country");

  autocomplete({
      input: input,
      fetch: function(text, update) {
          text = text.toLowerCase();
          var suggestions = countries.filter(n => n.label.toLowerCase().startsWith(text))
          update(suggestions);
      },
      onSelect: function(item) {
          input.value = item.label;
      }
  });

  var cityInput = document.getElementById("city")

  autocomplete({
      input: cityInput,
      fetch: async function(text,update) {
        text = text.toLowerCase();
        const cities = await getCities(text);
        var suggestions = cities;
        console.log(suggestions);
        update(suggestions);
      },
      onSelect: function(item) {
        cityInput.value = item.label.split(',')[0];
      }
  })

    // validate form
    $('#modal-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                minlength: 5
            },
            country: {
                required: true,
                minlength: 2
            },
            city: {
                required: true,
                minlength: 2
            }
        },
        messages: {
        },
        submitHandler: function(form) {
            var serializedData = $(form).serialize()

            $(form).ajaxSubmit({
                type:"POST",
                data: serializedData,
                url:"modalform.php",
                success: function() {
                    console.log(form)
                    $('.form-errors')[0].innerHTML = '<h5 style="color:darkgreen;">Successfully sent</h5>';
                    $('#myModal').modal('hide');
                },
                error: function() {
                  console.log($(form).serialize())
                    $('.form-errors')[0].innerHTML = '<h5 style="color:darkred;">There\'s been an error sending</h5>'
                    setTimeout(function() {
                      $('.form-errors')[0].innerHTML = '';
                      $('#myModal').modal('hide');
                    }, 2000)
                  
                }
            })
        }
    })

    $('#subscription-form').validate({
      rules: {
          name: {
              required: true,
              minlength: 2
          },
          email: {
              required: true,
              email: true
          }
      },
      messages: {
      },
      submitHandler: function(form) {

        $(form).submit(function(e) {

          e.preventDefault(); // avoid to execute the actual submit of the form.
      
          var form = $(this);
          var url = form.attr('action');
      
          $.ajax({
                 type: "POST",
                 url: url,
                 data: form.serialize(), // serializes the form's elements.
                 success: function(data)
                 {
                    console.log(data); // show response from the php script.
                 },
                 error: function(err) {
                   console.log(err);
                 }
               });
          });

          // console.log($(form).serialize());
          // $(form).ajaxForm({
          //     type:"POST",
          //     data: $(form).serialize(),
          //     url:"subscription.php",
          //     success: function() {
          //         console.log($(form).serialize())
          //         $('.error-handle')[0].innerHTML = '<h5 style="color:darkgreen;">Succesfully sent</h5>'
          //     },
          //     error: function() {
          //       console.log($(form).serialize())
          //       $('.error-handle')[0].innerHTML = '<h5 style="color:darkred;">Error sending</h5>';
          //       setTimeout(function() {
          //         $('.error-handle')[0].innerHTML = '';
          //       }, 2000)
          //     }
          // })
      }
  })
});



})(jQuery);	