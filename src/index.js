// Import styles
import "./styles/styles.css";
import "./styles/navBar.css";
import "./styles/aboutMe.css";
import "./styles/art.css";
import "./styles/introduction.css";
import "./styles/projects.css";
import "./styles/starting.css";
import "./styles/socials.css";
import "./styles/scrollbar.css";

// Import modules
import { changeSlides, showSlides, startAutoScroll, stopAutoScroll } from './slides.js';
import { handleBanner, handleBackground, handleNavBar, handleProjects } from "./scroll.js";
import { moveImg } from './projectImg.js';

// Initialize auto scrolling
showSlides();
startAutoScroll();

// Handle events for scrolling
window.addEventListener('scroll', () => {
  // Get current scroll location
  const currentScroll = window.scrollY;

  // Handle scroll functions
  handleNavBar(currentScroll);
  handleBanner(currentScroll);
  handleBackground(currentScroll);
  handleProjects(currentScroll);
});

// Handle dark mode toggle
const darkModeCheckbox = document.getElementById("darkModeCheckbox");
darkModeCheckbox.addEventListener("change", () => {
  if (darkModeCheckbox.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
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
const containers = document.querySelectorAll(".gridImgContainer");

containers.forEach(container => {
  const image = container.querySelector(".gridImg");

  container.addEventListener("mousemove", (e) => {
    moveImg(container, image, e);
  });

  container.addEventListener("mouseleave", () => {
    image.style.transform = "translate(0, 0)";
  });
})

// Handle image preloading
window.addEventListener("DOMContentLoaded", (event) => {
  const images = document.querySelectorAll(".slides img");
  images.forEach((img) => {
    const src = img.getAttribute("src");
    const image = new Image();
    image.src = src;
  })
})