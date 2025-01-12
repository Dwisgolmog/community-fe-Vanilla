let page = 1; //게시글 불러오는 페이지 번호
let limit = 5; //게시글을 한페이지에 몇개 가져올것인가
let pagePoint = 1; //하단 페이지 버튼의 시작 숫자
let boardInfoUrl = `http://${BACKEND_URL}:5050/api/boards?page=${page}&limit=${limit}`;
axios.defaults.withCredentials = true;

const formatCount = count => {
    if (count > 1000) {
        return `${Math.floor(count / 1000)}K`;
    } else {
        return count.toString();
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    await loadPage();
});

//NOTE: 페이지 로딩
const loadPage = async () => {
    try {
        const { data: boardsInfo } = await axios.get(boardInfoUrl);

        const container = document.querySelector('.content');
        container.innerHTML = '';

        boardsInfo.data.forEach(board => {
            const boardElement = document.createElement('div');
            const boardTitle =
                board.title.length > 26
                    ? board.title.substring(0, 26) + '...'
                    : board.title;
            boardElement.className = 'board';
            boardElement.id = `board-${board.board_id}`;
            boardElement.innerHTML = `
            <div class="board-info-container1">
                <div class="container">
                    <img src="${board.profile_img}" alt="${board.nickname}'s profile" />
                    <h2>${boardTitle}</h2>
                </div>
                <span style="margin-right: 20px;">${board.nickname}</span>
            </div>
            <hr style="margin: 15px -3%; width: 105.7%; color: #00000029; opacity: 0.16;">
            <div class="board-info-container2">
                <span>👍좋아요 ${formatCount(board.like_count)}&nbsp; 💬 댓글 ${formatCount(board.comment_count)}&nbsp; 👀 조회수 ${formatCount(board.view_count)}</span>
                <span style="margin-right:20px">${board.board_date}</span>
            </div>
            </div>
        `;

            boardElement.addEventListener('click', () => {
                window.location.href = `/board/view/${board.board_id}`;
            });

            container.appendChild(boardElement);
        });

        //NOTE:페이지번호 생성
        const pagination = document.querySelector('.pagination');
        pagination.innerHTML = '';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'page-btn';
        prevBtn.id = 'prev-btn';
        prevBtn.textContent = '<';
        pagination.appendChild(prevBtn);
        if (page === 1) prevBtn.disabled = true;

        const nextBtn = document.createElement('button');
        nextBtn.className = 'page-btn';
        nextBtn.id = 'next-btn';
        nextBtn.textContent = '>';
        pagination.appendChild(nextBtn);
        if (page == boardsInfo.totalPage) nextBtn.disabled = true;

        for (
            let i = pagePoint;
            i < pagePoint + 5 && i <= boardsInfo.totalPage;
            i++
        ) {
            const newBtn = document.createElement('button');
            newBtn.className = i === page ? 'page-btn active' : 'page-btn';
            newBtn.textContent = i;

            pagination.insertBefore(newBtn, nextBtn);
        }

        document.querySelector('.delayImg').style.display = 'none';
        document.querySelector('.main-content').style.display = 'block';
    } catch (e) {
        console.log(e);
    }
};

document.querySelector('.pagination').addEventListener('click', async event => {
    try {
        const target = event.target;
        if (target && target.id === 'next-btn') {
            page += 1;
            if (page % 5 === 1) {
                pagePoint += 5;
            }
        } else if (target && target.id === 'prev-btn') {
            page -= 1;
            if (page % 5 === 0) {
                pagePoint -= 5;
            }
        } else {
            page = parseInt(target.textContent, 10);
        }

        boardInfoUrl = `http://${BACKEND_URL}:5050/api/boards?page=${page}&limit=${limit}`;
        await loadPage();
    } catch (e) {
        console.error(e);
    }
});
