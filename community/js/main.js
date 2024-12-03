const boardInfoUrl = 'http://localhost:5050/api/boards?page=1&limit=10';
axios.defaults.withCredentials = true;

const formatCount = count => {
    if (count > 1000) {
        return `${Math.floor(count / 1000)}K`;
    } else {
        return count.toString();
    }
};

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const {
            data: { data: boardsInfo },
        } = await axios.get(boardInfoUrl);

        const container = document.querySelector('.main-content');

        boardsInfo.forEach(board => {
            const boardElement = document.createElement('div');
            const boardTitle =
                board.title.length > 26
                    ? board.title.substring(0, 26) + '...'
                    : board.title;
            boardElement.className = 'board';
            boardElement.id = `board-${board.board_id}`;
            boardElement.innerHTML = `
            <h2 style="margin-top: 1%;">${boardTitle}</h2>
            <div class="board-info-container">
                <div class="board-info">
                    좋아요 ${formatCount(board.like_count)} 댓글 ${formatCount(board.comment_count)} 조회수 ${formatCount(board.view_count)}
                </div>
                <div class="board-date">${board.board_date}</div>
            </div>
            <hr style="margin: 0 -3%; width: 105.7%; color: #00000029; opacity: 0.16;">
            <div class="board-writer">
                <img src="${board.profile_img}" alt="${board.nickname}'s profile" />
                <div style="margin-left: 10px; size: 15px; font-weight: 700;">${board.nickname}</div>
            </div>
        `;

            boardElement.addEventListener('click', () => {
                window.location.href = `/board/view/${board.board_id}`;
            });

            container.appendChild(boardElement);
        });
    } catch (e) {
        console.log(e);
        if (e.status == 401) window.location.href = '/';
    }
});
