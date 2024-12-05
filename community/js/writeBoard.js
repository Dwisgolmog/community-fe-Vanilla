const writeBoardUrl = 'http://localhost:5050/api/boards';
let title, content;
let content_img = null;

const addBoardBtn = document.querySelector('.add-btn');
const checkInput = (title, content) => {
    if (title && content) {
        addBoardBtn.style.backgroundColor = '#7F6AEE';
    } else {
        addBoardBtn.style.backgroundColor = '#aca0eb';
    }
};

const inputTitle = document.querySelector('#input-title');
inputTitle.addEventListener('input', ({ target }) => {
    title = target.value;
    checkInput(title, content);
});

const inputContent = document.querySelector('#textArea');
inputContent.addEventListener('input', ({ target }) => {
    content = target.value;
    checkInput(title, content);
});

const inputContentImg = document.querySelector('#content-img');
inputContentImg.addEventListener('change', ({ target }) => {
    content_img = target.files[0];
});

addBoardBtn.addEventListener('click', async () => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('content_img', content_img);

        if (title && content) {
            const response = await axios.post(writeBoardUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status == 201) {
                alert(response.data.message);
                location.href = '/main';
            }
        } else {
            alert('입력값이 유효하지 않습니다!');
        }
    } catch (e) {
        const response = e.response.data;
        alert(response.message);
    }
});
