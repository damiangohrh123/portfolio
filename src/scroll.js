// Previous scroll location
let lastScroll = 0;

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
  const topBanner = banner.getBoundingClientRect().top + currentScroll - 100;
  const bottomBanner = banner.getBoundingClientRect().bottom + currentScroll - 400;
  const startColor = [68, 152, 231];
  const endColor = [15, 36, 72];

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
  
  // Hide circle and scroll text
  if (currentScroll > bottomStarting) {
    circle.style.display = "none";
    startingText.classList.add("hidden");
  } else {
    circle.style.display = "block";
    startingText.classList.remove("hidden");
  }
}

function handleProjects(currentScroll) {
  const gridCellContainers = document.querySelectorAll(".gridCellContainer");

  gridCellContainers.forEach((container) => {
    const height = container.clientHeight;
    const position = container.getBoundingClientRect().top + currentScroll - height;

    if (position < currentScroll) {
      if (container.classList.contains("leftGrid")) {
        container.classList.add("slide-in-left");
      }
      if (container.classList.contains("rightGrid")) {
        container.classList.add("slide-in-right");
      }
    }
  })
}

export {
  handleNavBar,
  handleBanner,
  handleBackground,
  handleProjects
}