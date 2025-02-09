const express = require('express');
const path = require('path');
const app = express();

const PORT = 7777;

app.use(express.static(path.join(__dirname, '')));

// NOTE: Health Check
app.get('/health-check', (req, res) => {
    res.status(200).json({
        status: 'ok',
        uptime: process.uptime(),
    });
});

//  NOTE : 로그인
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './html/Login.html'));
});

// NOTE : 회원가입
app.get('/Signup', (req, res) => {
    res.sendFile(path.join(__dirname, './html/Signup.html'));
});

// NOTE : 메인
app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname, './html/main.html'));
});

// NOTE : 게시글 작성
app.get('/board/write', (req, res) => {
    res.sendFile(path.join(__dirname, './html/writeBoard.html'));
});

// NOTE : 게시글 상세 보기
app.get('/board/view/:id', (req, res) => {
    res.sendFile(path.join(__dirname, './html/viewBoard.html'));
});

// NOTE : 게시글 수정
app.get('/board/edit/:id', (req, res) => {
    res.sendFile(path.join(__dirname, './html/editBoard.html'));
});

// NOTE : 회원정보 수정
app.get('/users/info-edit', (req, res) => {
    res.sendFile(path.join(__dirname, './html/editUserInfo.html'));
});

// NOTE : 비밀번호 수정
app.get('/users/pwd-edit', (req, res) => {
    res.sendFile(path.join(__dirname, './html/editPassword.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
