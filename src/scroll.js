// Previous scroll location
let lastScroll = 0;

// Linear interpolation function for color values
function lerpColor(color1, color2, t) {
  return color1.map((channel, i) => Math.round(channel + (color2[i] - channel) * t));
}

function handleBanner(currentScroll) {
  const banner = document.querySelector(".banner");
  const bannerHeight = banner.getBoundingClientRect().height;
  const topBanner = banner.getBoundingClientRect().top + currentScroll - bannerHeight;
  const bottomBanner = banner.getBoundingClientRect().bottom + currentScroll - bannerHeight;
  const startColor = [58, 193, 63];
  const endColor = [121, 124, 252];

  // Calculate the scroll position relative to the trigger points as a percentage
  const scrollDistance = currentScroll - topBanner;
  const scrollableDistance = bottomBanner - topBanner;
  let scrollPercentage = (scrollDistance / scrollableDistance);
  scrollPercentage = Math.max(0.01, Math.min(1, scrollPercentage)); // Limit to between 0.01 to 1
  
  // Interpolate the background color based on the scroll percentage
  const interpolatedColor = lerpColor(startColor, endColor, scrollPercentage);
  
  // Apply the interpolated background color to the element
  banner.style.backgroundColor = `rgb(${interpolatedColor.join(',')})`;

  // Calculate the new background size based on the scroll position
  const newSize = currentScroll * 0.05;

  // Apply the new background size to the banner
  banner.style.backgroundSize = `${newSize}%`;
}

function handleBackground(currentScroll) {
  const circle = document.querySelector(".circle");
  const startingText = document.querySelector(".startingText");

  // Calculate bottom of starting container
  const bottomStarting = document.querySelector(".starting").getBoundingClientRect().bottom + currentScroll - 800;

  // Increase circle size
  const newCircleSize = currentScroll * 2 + 200;
  circle.style.width = newCircleSize + 'px';
  circle.style.height = newCircleSize + 'px';
  
  // Change background color after circle has expanded to fill screen
  if (currentScroll > bottomStarting) {
    document.documentElement.style.setProperty("--background-color", "var(--grey)");
    circle.style.display = "none";
    startingText.classList.add("hidden");
  } else {
    document.documentElement.style.setProperty("--background-color", "var(--white)");
    circle.style.display = "block";
    startingText.classList.remove("hidden");
  }
}

export {
  handleBanner,
  handleBackground
}