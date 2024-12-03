const url = window.location.href;
const boardNumber = url.substring(url.lastIndexOf('/') + 1);
const boardInfoUrl = `http://localhost:5050/api/boards/${boardNumber}`;
const boardCommentInfoUrl = `http://localhost:5050/api/boards/${boardNumber}/comments`;
const writeCommentUrl = `http://localhost:5050/api/boards/${boardNumber}/comments`;
const removeCommentUrl = `http://localhost:5050/api/boards/${boardNumber}/comments/`;
let removeCommentId; //댓글 삭제시 댓글 번호 저장
axios.defaults.withCredentials = true;

//NOTE:게시글 및 댓글 조회
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const { data: boardInfo } = await axios.get(boardInfoUrl);
        const title = document.querySelector('#title');
        const writerProfile = document.querySelector('#writerProfile');
        const nickname = document.querySelector('#nickname');
        const boardDate = document.querySelector('#board_date');
        const contentImg = document.querySelector('#contentImg');
        const content = document.querySelector('#content');
        const likeCount = document.querySelector('#likeCount');
        const viewCount = document.querySelector('#viewCount');
        const commentCount = document.querySelector('#commentCount');

        title.innerText = boardInfo.data.title;
        writerProfile.src = boardInfo.data.profile_img;
        nickname.innerText = boardInfo.data.nickname;
        boardDate.innerText = boardInfo.data.board_date;
        contentImg.src = boardInfo.data.content_img;
        contentImg.style.display = 'block';
        content.innerText = boardInfo.data.content;
        likeCount.innerText = boardInfo.data.like_count;
        viewCount.innerText = boardInfo.data.view_count;
        commentCount.innerText = boardInfo.data.comment_count;

        const { data: commentInfo } = await axios.get(boardCommentInfoUrl);
        const { data: userInfo } = await axios.get(userInfoUrl);
        const conatiner = document.querySelector('.main-content');
        commentInfo.data.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.id = `comment-${comment.comment_id}`;
            commentElement.innerHTML = `
            <div class="comment-info">
                <div class="comment-title">
                    <img style="width: 36px; height: 36px; border-radius: 50%; margin-right: 10px;"
                        src="${comment.profile_img}">
                    <span style="margin-right: 24px;"${comment.nickanme}</span>
                    <span>${comment.comment_date}</span>
                </div>
                <div class="comment-content" style="white-space: pre-wrap;">${comment.comment}</div>
            </div>
            <div class="comment-btn">
                <button id='edit-comment' comment-id='${comment.comment_id}'>수정</button>
                <button style="margin-left: 8px;" id="remove-comment" comment-id='${comment.comment_id}'>삭제</button>
            </div>
            `;

            //NOTE:삭제할 댓글 번호 저장
            const commentButtons = commentElement.querySelector('.comment-btn');
            if (comment.user_id != userInfo.data.user_id) {
                commentButtons.style.display = 'none';
            }

            conatiner.appendChild(commentElement);
        });

        //NOTE:게시글과 로그인한 유저가 다를시 버튼 안보이게 처리함
        const editBoardBtn = document.querySelector('.edit-board-btn');
        if (boardInfo.data.user_id != userInfo.data.user_id) {
            editBoardBtn.style.display = 'none';
        }

        //NOTE:comment 모달창
        const commentRemoveBtns = document.querySelectorAll('#remove-comment');
        const commentModal = document.querySelector('.comment-modal-container');
        const cancleModal2 = document.querySelector('.modal-btn3');
        commentRemoveBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                removeCommentId = btn.getAttribute('comment-id');
                commentModal.style.display = 'flex';
            });
        });

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

//NOTE:댓글 작성
const addComment = document.querySelector('#add-comment');
const inputText = document.querySelector('#input-comment');
addComment.addEventListener('click', async () => {
    try {
        const response = await axios.post(writeCommentUrl, {
            comment: inputText.value,
        });

        if (response.status == 201) {
            alert('댓글 작성 완료!');
            location.reload();
        }
    } catch (e) {
        if (e.status == 401) {
            alert('세션 만료! 다시 로그인해주세요!');
            window.location.href = '/';
        } else if (e.status == 404) {
            alert(e.message);
        }
    }
});

//NOTE:댓글 삭제
const removeCommentBtn = document.querySelector('.modal-btn4');
removeCommentBtn.addEventListener('click', async () => {
    try {
        const response = await axios.delete(removeCommentUrl + removeCommentId);
        console.log(response);
        if (response.status == 201) {
            setTimeout(() => {
                location.reload();
            }, 500);
        }
    } catch (e) {
        if (e.status == 401) {
            alert('세션 만료! 다시 로그인해주세요!');
            window.location.href = '/';
        }
    }
});

