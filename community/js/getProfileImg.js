const userInfoUrl = 'http://localhost:5050/api/users';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const { data: userInfo } = await axios.get(userInfoUrl);
        document.querySelector('.profile-icon').src = userInfo.data.profile_img;
    } catch (e) {
        console.log(e);
    }
});
