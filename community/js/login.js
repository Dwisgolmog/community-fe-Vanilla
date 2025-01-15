const url = `http://${BACKEND_URL}:5050/api/users/login`;

let checkEmail = false;
let checkPassword = false;
let email;
let password;

const checkInput = () => {
    const loginBtn = document.querySelector('.login-button');

    if (checkEmail && checkPassword) {
        loginBtn.style.backgroundColor = '#DA7F76';
    } else {
        loginBtn.style.backgroundColor = '#F5C3C2';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const inputEmail = document.querySelector('#email');
    const inputPassword = document.querySelector('#password');
    const emailHelperText = inputEmail.nextElementSibling;
    const passwordHelperText = inputPassword.nextElementSibling;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^*])[A-Za-z\d@$!%*?&#^*]{8,20}$/;
    inputEmail.addEventListener('input', e => {
        if (emailRegex.test(e.target.value)) {
            emailHelperText.style.display = 'none';
            inputEmail.style.marginBottom = '16px';
            checkEmail = true;
            email = e.target.value;
        } else {
            emailHelperText.style.display = 'flex';
            inputEmail.style.marginBottom = '0px';
            checkEmail = false;
        }

        checkInput();
    });

    inputPassword.addEventListener('input', e => {
        if (e.target.value == '') {
            passwordHelperText.style.display = 'flex';
            inputPassword.style.marginBottom = '0px';
            passwordHelperText.textContent = '*비밀번호를 입력해주세요';
            checkPassword = false;
        } else if (passwordRegex.test(e.target.value)) {
            passwordHelperText.style.display = 'none';
            inputPassword.style.marginBottom = '16px';
            checkPassword = true;
            password = e.target.value;
        } else {
            passwordHelperText.style.display = 'flex';
            inputPassword.style.marginBottom = '0px';
            passwordHelperText.textContent =
                '*비밀번호는 8자 이상, 20자이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
            checkPassword = false;
        }

        checkInput();
    });
});

const loginBtn = document.querySelector('.login-button');

loginBtn.addEventListener('click', async () => {
    try {
        if (checkEmail && checkPassword) {
            const response = await axios.post(
                url,
                {
                    email: email,
                    password: password,
                },
                {
                    withCredentials: true,
                },
            );

            if (response.status === 200) {
                window.location.href = '/main';
            }
        } else {
            alert('이메일 또는 비밀번호를 올바르게 입력해주세요!');
        }
    } catch (e) {
        console.log(e);
        alert(e.response.data.message);
    }
});
