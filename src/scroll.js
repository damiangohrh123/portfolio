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

export {
  handleArtSection,
  handleNavBar,
  handleBanner
}