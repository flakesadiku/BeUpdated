$(document).ready(function(){
    $('#nav-icon3').on('click', function(){
      $('body').toggleClass('open');
    });
});

$(window).load(function(){ 
	setTimeout(function(){
      $('h1.transition.opacity').removeClass('animate');
    }, 150);
    setTimeout(function(){
      $('h3.transition.opacity').removeClass('animate');
    }, 300);
});

$(window).scroll(function() {
   if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      setTimeout(function(){
      $('.footer-holder.footer1.transition.opacity').removeClass('animate');
    }, 100);

     setTimeout(function(){
      $('.footer-holder.footer2.transition.opacity').removeClass('animate');
    }, 400);

     setTimeout(function(){
      $('.footer-holder.footer3.transition.opacity').removeClass('animate');
    }, 700);

    setTimeout(function(){
      $('.footer-holder.footer4.transition.opacity').removeClass('animate');
    }, 1000);
   }
   if ($(window).width() <= 768){
    if($(window).scrollTop() + $(window).height() > $(document).height() - 300) {
      setTimeout(function(){
      $('.footer-holder.footer1.transition.opacity').removeClass('animate');
    }, 100);

     setTimeout(function(){
      $('.footer-holder.footer2.transition.opacity').removeClass('animate');
    }, 400);

     setTimeout(function(){
      $('.footer-holder.footer3.transition.opacity').removeClass('animate');
    }, 700);

    setTimeout(function(){
      $('.footer-holder.footer4.transition.opacity').removeClass('animate');
    }, 1000);
   }
    }
});
