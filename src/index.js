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

// Previous scroll location
let lastScroll = 0;

function handleArtSection(currentScroll) {
  // Get the trigger point for all the sections
  const artTrigger = document.querySelector(".artSection").getBoundingClientRect().top + currentScroll - 250;

  // Change background color based on scroll distance of Y
  if (currentScroll > artTrigger) {
    document.documentElement.style.setProperty("--background-color", "var(--art-color)");
    document.documentElement.style.setProperty("--font-color", "var(--grey)");
  } else {
    document.documentElement.style.removeProperty("--background-color");
    document.documentElement.style.setProperty("--font-color", "var(--dark-grey)");
  }
}

function handleNavBar(currentScroll) {
  // Hiding and displaying of nav bar
  const navBar = document.querySelector(".navBar");

  // Scolling down
  if (currentScroll > lastScroll) navBar.classList.add("hidden");
  // Scrolling up
  if (currentScroll < lastScroll) navBar.classList.remove("hidden");

  lastScroll = currentScroll;
}

// Linear interpolation function for color values
function lerpColor(color1, color2, t) {
  return color1.map((channel, i) => Math.round(channel + (color2[i] - channel) * t));
}

function handleBanner(currentScroll) {
  const banner = document.querySelector(".banner");
  const topBanner = banner.getBoundingClientRect().top + currentScroll - 500;
  const bottomBanner = banner.getBoundingClientRect().bottom + currentScroll - 500;
  const startColor = [58, 193, 63];
  const endColor = [121, 124, 252];

  // Calculate the scroll position relative to the trigger points as a percentage
  const scrollPercentage = Math.max(0, Math.min(1, (currentScroll - topBanner) / (bottomBanner - topBanner)));
  
  // Interpolate the background color based on the scroll percentage
  const interpolatedColor = lerpColor(startColor, endColor, scrollPercentage);
  
  // Apply the interpolated background color to the element
  banner.style.backgroundColor = `rgb(${interpolatedColor.join(',')})`;

  // Calculate the new background size based on the scroll position
  const newSize = 80 + currentScroll * 0.05; // Adjust multiplier as needed

  // Apply the new background size to the banner
  banner.style.backgroundSize = `${newSize}%`;
}

window.addEventListener('scroll', () => {
  // Get current scroll location
  const currentScroll = window.scrollY;

  // Handle scroll functions
  handleArtSection(currentScroll);
  handleNavBar(currentScroll);
  handleBanner(currentScroll);
});