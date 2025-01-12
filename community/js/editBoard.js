const url = window.location.href;
const boardNumber = url.substring(url.lastIndexOf('/') + 1);
const boardInfoUrl = `http://${BACKEND_URL}:5050/api/boards/${boardNumber}`;

const inputTitle = document.querySelector('#input-title');
const inputContent = document.querySelector('#textArea');
const inputImg = document.querySelector('#content-img');
const backPage = document.querySelector('#back-page');

let changeTitle = false;
let changeContent = false;
let changeImg = false;

const editBtn = document.querySelector('.edit-btn');
const checkChange = () => {
    if (changeTitle || changeContent || changeImg) {
        editBtn.style.backgroundColor = '#DA7F76';
        return true;
    } else {
        editBtn.style.backgroundColor = '#F5C3C2';
        return false;
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await loadBoardInfo();
    } catch (e) {
        console.log(e);
    }
});

const loadBoardInfo = async () => {
    const { data: boardInfo } = await axios.get(boardInfoUrl);
    const { title, content } = boardInfo.data;

    inputTitle.value = title;
    inputContent.value = content;
    backPage.href = `/board/view/${boardNumber}`;
};

inputTitle.addEventListener('change', () => {
    changeTitle = true;
    checkChange();
});
inputContent.addEventListener('change', () => {
    changeContent = true;
    checkChange();
});
inputImg.addEventListener('change', () => {
    changeImg = true;
    checkChange();
});

editBtn.addEventListener('click', async () => {
    try {
        const formData = new FormData();
        formData.append('title', inputTitle.value);
        formData.append('content', inputContent.value);
        formData.append('content_img', inputImg.files[0]);

        if (checkChange) {
            const response = await axios.patch(boardInfoUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status == 201) {
                location.href = `/board/view/${boardNumber}`;
            }
        } else {
            alert('변경사항이 없습니다!');
        }
    } catch (e) {
        console.log(e);
    }
});
