const profileIcon = document.querySelector('.profile-icon');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownElement = document.querySelector('.dropdown-element');
profileIcon.addEventListener('mouseenter', () => {
    dropdownMenu.style.display = 'block';
});
profileIcon.addEventListener('mouseleave', () => {
    dropdownMenu.style.display = 'none';
});
dropdownMenu.addEventListener('mouseenter', () => {
    dropdownMenu.style.display = 'block';
});
dropdownMenu.addEventListener('mouseleave', () => {
    dropdownMenu.style.display = 'none';
});
