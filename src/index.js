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
  let nextSlideIndex = slideIndex + n;

  // Make sure slide index stays within range
  if (nextSlideIndex >= slides.length) {
    nextSlideIndex = 0;
  }
  if (nextSlideIndex < 0) {
    nextSlideIndex = slides.length - 1;
  }

  // Pass in direction to showSlide
  if (n === 1) showSlides("right", slideIndex, nextSlideIndex);
  if (n === -1) showSlides("left", slideIndex, nextSlideIndex);

  slideIndex = nextSlideIndex;
}

function showSlides(direction = "none", currentSlideIndex = 0, nextSlideIndex = 0) {
  // Set all images' display to none exept current image
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].classList.remove("slide-in", "slide-in-left", "slide-in-right", "slide-out-left", "slide-out-right");
  }

  // Add appropriate animation class based on the direction
  if (direction === "left") {
    slides[nextSlideIndex].classList.add("slide-in-left");
    slides[currentSlideIndex].classList.add("slide-out-left");
  }
  if (direction === "right") {
    slides[nextSlideIndex].classList.add("slide-in-right");
    slides[currentSlideIndex].classList.add("slide-out-right");
  }

  slides[currentSlideIndex].style.display = "block";
  slides[nextSlideIndex].style.display = "block";
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
showSlides();
startAutoScroll();

