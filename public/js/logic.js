const dropdown = document.getElementById('languageDropdown');
const options = document.getElementById('languageOptions');

dropdown.addEventListener('click', function (e) {
  e.stopPropagation();
  options.classList.toggle('active');
});

document.addEventListener('click', function () {
  options.classList.remove('active');
});