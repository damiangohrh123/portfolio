import "./styles.css";

let autoScrollInterval;
let slideIndex = 0;

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const slides = document.getElementsByClassName("slide");

prevBtn.addEventListener("click", () => {
  if (slideIndex > 0) {
    slideIndex--;
  } else {
    slideIndex = slides.length - 1;
  }
  showSlides();
  stopAutoScroll();
  startAutoScroll();
});

nextBtn.addEventListener("click", () => {
  if (slideIndex < slides.length - 1) {
    slideIndex++;
  } else {
    slideIndex = 0;
  }
  showSlides();
  stopAutoScroll();
  startAutoScroll();
});

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  slides[slideIndex].style.display = "block";
}

function autoScroll() {
  if (slideIndex < slides.length - 1) {
    slideIndex++;
  } else {
    slideIndex = 0;
  }
  showSlides();
}

function startAutoScroll() {
  autoScrollInterval = setInterval(autoScroll, 3000);
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

startAutoScroll();
showSlides();
