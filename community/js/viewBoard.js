const url = window.location.href;
const boardNumber = url.substring(url.lastIndexOf('/') + 1);
const boardInfoUrl = `http://localhost:5050/api/boards/${boardNumber}`;
const boardCommentUrl = `http://localhost:5050/api/boards/${boardNumber}/comments`;
const removeCommentUrl = `http://localhost:5050/api/boards/${boardNumber}/comments/`;
let removeCommentId; //댓글 삭제시 댓글 번호 저장
axios.defaults.withCredentials = true;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const { data: userInfo } = await axios.get(userInfoUrl);
        await loadBoardInfo(userInfo);
        await loadComments(userInfo);
    } catch (e) {
        handleError(e);
    }
});

//NOTE:게시글 상세 조회
const loadBoardInfo = async userInfo => {
    const { data: boardInfo } = await axios.get(boardInfoUrl);
    const {
        title,
        profile_img,
        nickname,
        board_date,
        content_img,
        content,
        like_count,
        view_count,
        comment_count,
        user_id,
    } = boardInfo.data;

    document.querySelector('#title').innerText = title;
    document.querySelector('#writerProfile').src = profile_img;
    document.querySelector('#nickname').innerText = nickname;
    document.querySelector('#board_date').innerText = board_date;
    document.querySelector('#contentImg').src = content_img;
    document.querySelector('#contentImg').style.display = 'block';
    document.querySelector('#content').innerText = content;
    document.querySelector('#likeCount').innerText = like_count;
    document.querySelector('#viewCount').innerText = view_count;
    document.querySelector('#commentCount').innerText = comment_count;

    //NOTE:게시글과 로그인한 유저가 다를시 버튼 안보이게 처리함
    const editBoardBtn = document.querySelector('.edit-board-btn');
    if (user_id !== userInfo.data.user_id) {
        editBoardBtn.style.display = 'none';
    }
};

//NOTE:댓글 조회
const loadComments = async userInfo => {
    const { data: commentInfo } = await axios.get(boardCommentUrl);

    const container = document.querySelector('.sub-content');

    container.innerHTML = '';
    commentInfo.data.forEach(
        ({
            comment_id,
            profile_img,
            nickname,
            comment_date,
            comment,
            user_id,
        }) => {
            const isUserComment = user_id == userInfo.data.user_id;

            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.id = `comment-${comment_id}`;
            commentElement.innerHTML = `
            <div class="comment-info">
                <div class="comment-title">
                    <img style="width: 36px; height: 36px; border-radius: 50%; margin-right: 10px;" src="${profile_img}">
                    <span style="margin-right: 24px;">${nickname}</span>
                    <span>${comment_date}</span>
                </div>
                <div class="comment-content" style="white-space: pre-wrap;">${comment}</div>
            </div>
            <div class="comment-btn" ${!isUserComment ? 'style="display:none;"' : 'style="display:flex;"'}>
                <button class="edit-comment" data-id="${comment_id}">수정</button>
                <button class="remove-comment" data-id="${comment_id}" style="margin-left: 8px;">삭제</button>
            </div>
        `;
            container.appendChild(commentElement);
        },
    );

    //NOTE: 댓글 수정 & 삭제 이벤트
    container.addEventListener('click', ({ target }) => {
        if (target.classList.contains('edit-comment')) {
            handleEditComment(target.dataset.id);
        } else if (target.classList.contains('remove-comment')) {
            removeCommentId = target.dataset.id;
            document.querySelector('.comment-modal-container').style.display =
                'flex';
        }
    });

    //NOTE: 댓글 삭제 여부 모달창
    document
        .querySelector('.modal-btn4')
        .addEventListener('click', async () => {
            await deleteComment(removeCommentId);
        });

    document.querySelector('.modal-btn3').addEventListener('click', () => {
        document.querySelector('.comment-modal-container').style.display =
            'none';
    });
};


        cancleModal2.addEventListener('click', () => {
            commentModal.style.display = 'none';
        });
    } catch (e) {
        console.log(e);
        if (e.status == 401) {
            alert('세션 만료! 다시 로그인해주세요!');
            window.location.href = '/';
        } else if (e.status == 404) {
            alert('데이터를 찾을 수 없습니다!');
        }
    }
});

//NOTE: 댓글 작성
document.querySelector('#add-comment').addEventListener('click', async () => {
    const inputText = document.querySelector('#input-comment');
    const comment = inputText.value.trim();
    if (!comment) return alert('댓글 내용을 입력해주세요!');

    try {
        const response = await axios.post(boardCommentUrl, { comment });
        if (response.status === 201) {
            alert('댓글 작성 완료!');
            location.reload();
        }
    } catch (e) {
        handleError(e);
    }
});

//NOTE: 댓글 삭제 요청
const deleteComment = async commentId => {
    try {
        const response = await axios.delete(removeCommentUrl + commentId);
        if (response.status === 201) {
            alert('댓글 삭제 완료!');
            location.reload();
        }
    } catch (e) {
        handleError(e);
    }
};

const handleError = e => {
    const status = e.response?.status;
    if (status === 401) {
        alert('세션 만료! 다시 로그인해주세요!');
        window.location.href = '/';
    } else if (status === 404) {
        alert('데이터를 찾을 수 없습니다!');
    } else {
        console.error(e);
    }
};
