const profileIcon = document.querySelector('.profile');
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

//NOTE:로그아웃
const logoutUrl = `http://${BACKEND_URL}:5050/api/users/logout`;
document.querySelector('#logout-btn').addEventListener('click', async () => {
    try {
        const response = await axios.post(logoutUrl);

        if (response.status == 200) {
            location.href = '/';
        }
    } catch (e) {
        console.log(e);
    }
});
