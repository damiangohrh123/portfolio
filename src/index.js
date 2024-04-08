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

// Previous scroll location
let lastScroll = 0;

window.addEventListener('scroll', () => {
  // Get current scroll location
  const currentScroll = window.scrollY;

  // Get the trigger point for all the sections
  const introductionTrigger = document.querySelector(".introductionSection").getBoundingClientRect().top + currentScroll - 250;
  const projectTrigger = document.querySelector(".projectSection").getBoundingClientRect().top + currentScroll - 250;
  const artTrigger = document.querySelector(".artSection").getBoundingClientRect().top + currentScroll - 250;

  // Change background color based on scroll distance of Y
  if (currentScroll > introductionTrigger) {
    document.documentElement.style.setProperty('--background-color', 'var(--introduction-color)');
  } else {
    document.documentElement.style.removeProperty('--background-color');
  }

  if (currentScroll > projectTrigger) {
    document.documentElement.style.setProperty('--background-color', 'var(--project-color)');
  }

  if (currentScroll > artTrigger) {
    document.documentElement.style.setProperty('--background-color', 'var(--art-color)');
  }

  // Hiding and displaying of nav bar
  const navBar = document.querySelector(".navBar");

  // Scolling down
  if (currentScroll > lastScroll) navBar.classList.add("hidden");
  // Scrolling up
  if (currentScroll < lastScroll) navBar.classList.remove("hidden");

  lastScroll = currentScroll;

  

});

// Initialize auto scrolling
showSlides();
startAutoScroll();

