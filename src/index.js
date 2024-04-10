// Import styles
import "./styles/styles.css";
import "./styles/art.css";
import "./styles/introduction.css";
import "./styles/navBar.css";
import "./styles/projects.css";

// Import modules
import { changeSlides, showSlides, startAutoScroll, stopAutoScroll } from './slides.js';
import { handleArtSection, handleNavBar, handleBanner } from "./scroll.js";

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