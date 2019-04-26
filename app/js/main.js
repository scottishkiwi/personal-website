$(document).ready(function(){

    init();
    

});

var init = function(){
    if($('#introduction-title').length){
        typeWriter();
    }
    
   copyClipBoard();
}

function copyClipBoard(){

    $('.email-container button').on('click', function(){
        var copyText = document.getElementById('email-info');

        var textArea = document.createElement("textarea");
        textArea.value = copyText.textContent;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
        alert(copyText.textContent+ ' copied to clipboard!');
    });

}


var i = 0;
var txt = "Hi there, I'm Daniel. I live in Wellington, New Zealand. I build high quality websites and web applications using modern technologies.";
var speed = 40;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("introduction-title").innerHTML += txt.charAt(i);
    i++;
    if(i==21){
        setTimeout(typeWriter, 1000);
    }else if(i==56){
        setTimeout(typeWriter, 1000);
    }else{
        setTimeout(typeWriter, speed);
    }
    
  }
}


// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 3;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        $('header').removeClass('nav-up').addClass('nav-down');
        
    }
    
    lastScrollTop = st;
}