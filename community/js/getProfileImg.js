const userInfoUrl = 'http://localhost:5050/api/users';
axios.defaults.withCredentials = true;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const { data: userInfo } = await axios.get(userInfoUrl);
        document.querySelector('.profile-icon').src = userInfo.data.profile_img;
    } catch (e) {
        console.log(e);
        if (e.response.status == 401) {
            alert('세션 만료! 다시 로그인해주세요!');
            window.location.href = '/';
        }
    }
});
