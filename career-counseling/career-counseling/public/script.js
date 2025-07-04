function openPopup() {
  document.getElementById('popup').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const toggleIcon = document.querySelector('.toggle-icon');
  if (document.body.classList.contains('dark-mode')) {
    toggleIcon.textContent = "🌞";  // Sun icon for light mode
  } else {
    toggleIcon.textContent = "🌙";  // Moon icon for dark mode
  }
}
