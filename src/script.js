  // Function to display the image in the overlay
  function showPreview(imageUrl) {
    const overlay = document.getElementById('overlay');
    const modalImage = document.getElementById('overlay-image');
    overlay.style.display = 'flex';
    modalImage.src = imageUrl;
}

// Function to close the overlay
function closeOverlay() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}