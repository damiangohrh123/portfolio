// Import styles
import "./styles/styles.css";
import "./styles/art.css";
import "./styles/introduction.css";
import "./styles/navBar.css";
import "./styles/projects.css";

// Import modules
import { changeSlides, showSlides, startAutoScroll, stopAutoScroll } from './slides.js';
import { handleArtSection, handleNavBar, handleBanner } from "./scroll.js";
import { moveImg } from './projectImg.js';

// Initialize auto scrolling
showSlides();
startAutoScroll();

// Handle events for scrolling
window.addEventListener('scroll', () => {
  // Get current scroll location
  const currentScroll = window.scrollY;

  // Handle scroll functions
  handleArtSection(currentScroll);
  handleNavBar(currentScroll);
  handleBanner(currentScroll);
});

// Handle button clicks
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

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

// Handle image movement when mouse enters project grids
const containers = document.querySelectorAll(".gridCell");

containers.forEach(container => {
  const image = container.querySelector(".gridImg");

  container.addEventListener("mousemove", (e) => {
    moveImg(container, image, e);
  });

  container.addEventListener("mouseleave", () => {
    image.style.transform = "translate(0, 0)";
  })
})