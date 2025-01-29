const editPwdUrl = `http://${BACKEND_URL}:5050/api/users/password`;
const inputPassword = document.querySelector('#password');
const inputRePassword = document.querySelector('#rePassword');
const passwordHelperText = inputPassword.nextElementSibling;
const rePasswordHelperText = inputRePassword.nextElementSibling;

let checkPassword = false;
let checkRePassword = false;
let password;
let rePassword;

const editBtn = document.querySelector('.edit-btn');
editBtn.disabled = true;
const checkInput = () => {
    if (checkPassword && checkRePassword) {
        editBtn.style.backgroundColor = '#D16160';
        editBtn.disabled = false;
        return true;
    } else {
        editBtn.style.backgroundColor = '#F5C3C2';
        editBtn.disabled = true;
        return false;
    }
};

const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^*])[A-Za-z\d@$!%*?&#^*]{8,20}$/;

inputPassword.addEventListener('change', e => {
    password = e.target.value;
    if (e.target.value == '') {
        passwordHelperText.style.display = 'flex';
        inputPassword.style.marginBottom = '0px';
        passwordHelperText.textContent = '*비밀번호를 입력해주세요.';
        checkPassword = false;
    } else if (passwordRegex.test(e.target.value)) {
        passwordHelperText.style.display = 'none';
        inputPassword.style.marginBottom = '25px';
        rePasswordHelperText.style.display = 'none';
        checkPassword = true;
    } else {
        passwordHelperText.style.display = 'flex';
        inputPassword.style.marginBottom = '0px';
        passwordHelperText.textContent =
            '*비밀번호는 8자 이상, 20자이하이며, 대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.';
        checkPassword = false;
    }

    if (password != rePassword) {
        rePasswordHelperText.style.display = 'flex';
        inputRePassword.style.marginBottom = '0px';
        rePasswordHelperText.textContent = '*비밀번호가 다릅니다.';
        checkRePassword = false;
    }
    checkInput();
});

inputRePassword.addEventListener('change', e => {
    rePassword = e.target.value;
    if (e.target.value == '') {
        rePasswordHelperText.style.display = 'flex';
        inputRePassword.style.marginBottom = '0px';
        rePasswordHelperText.textContent = '*비밀번호를 한번더 입력해주세요.';
        checkRePassword = false;
    } else if (password != e.target.value) {
        rePasswordHelperText.style.display = 'flex';
        inputRePassword.style.marginBottom = '0px';
        rePasswordHelperText.textContent = '*비밀번호가 다릅니다.';
        checkRePassword = false;
    } else {
        rePasswordHelperText.style.display = 'none';
        inputRePassword.style.marginBottom = '40px';
        checkRePassword = true;
    }

    if (password != rePassword) {
        rePasswordHelperText.style.display = 'flex';
        inputRePassword.style.marginBottom = '0px';
        rePasswordHelperText.textContent = '*비밀번호가 다릅니다.';
        checkRePassword = false;
    }

    checkInput();
});

//NOTE: 회원 탈퇴
editBtn.addEventListener('click', async () => {
    try {
        if (checkInput()) {
            const response = await axios.patch(editPwdUrl, {
                password: password,
            });

            if (response.status == 201) {
                alert('비밀번호 수정 완료!');
                location.href = '/';
            }
        } else {
            alert('입력값이 유효하지 않습니다!');
        }
    } catch (e) {
        console.log(e);
    }
});
