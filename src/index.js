import "./styles/styles.css";
import "./styles/art.css";
import "./styles/introduction.css";
import "./styles/navBar.css";
import "./styles/projects.css";

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const slides = document.getElementsByClassName("slide");

let autoScrollInterval;
let slideIndex = 0;

prevBtn.addEventListener("click", () => {
  changeSlides(-1);
  stopAutoScroll();
  startAutoScroll();
});

nextBtn.addEventListener("click", () => {
  changeSlides(1);
  stopAutoScroll();
  startAutoScroll();
});

function changeSlides(n) {
  slideIndex += n;

  // Make sure slide index stays within range
  if (slideIndex >= slides.length) {
    slideIndex = 0;
  }
  if (slideIndex < 0) {
    slideIndex = slides.length - 1;
  }

  showSlides();
}

function showSlides() {
  // Set all images' display to none exept current image
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";
}

function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    changeSlides(1);
  }, 3000);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Initialize auto scrolling 
startAutoScroll();
showSlides();
