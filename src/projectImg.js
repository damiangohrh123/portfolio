function moveImg(container, image, e) {
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const moveX = (centerX - x) / 10;
  const moveY = (centerY - y) / 10;

  const scaleFactor = 1.1;

  image.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scaleFactor})`;
}

export {
  moveImg
}
