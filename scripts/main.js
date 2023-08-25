const imgs = document.querySelectorAll('.slideshow-box img');
let currentImg = 0; // index of the first image
const interval = 5000; // duration(speed) of the slide

function changeSlide() {
    imgs[currentImg].style.opacity = 0; // Fade out the current image
    
    currentImg = (currentImg + 1) % imgs.length; // update the index number
    
    imgs[currentImg].style.opacity = 1; // Fade in the next image
}

// Initial setup to show the first image
imgs[currentImg].style.opacity = 1;

setInterval(changeSlide, interval); // Pass the function reference without invoking it immediately
