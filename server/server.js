const express = require("express");
const path = require("path");
const app = express();

const PORT = 7777;

app.use(express.static(path.join(__dirname, "../community")));

//  NOTE : 로그인
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../community/Login.html"));
});

// NOTE : 회원가입
app.get("/Signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../community/Signup.html"));
});

// NOTE : 메인
app.get("/main", (req, res) => {
  res.sendFile(path.join(__dirname, "../community/main.html"));
});

// NOTE : 게시글 작성
app.get("/board/write", (req, res) => {
  res.sendFile(path.join(__dirname, "../community/board/writeBoard.html"));
});

// NOTE : 게시글 상세 보기
app.get("/board/view/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../community/board/viewBoard.html"));
});

// NOTE : 게시글 수정
app.get("/board/edit/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../community/board/editBoard.html"));
});

// NOTE : 회원정보 수정
app.get("/users/info-edit", (req, res) => {
  res.sendFile(path.join(__dirname, "../community/userInfo/editUserInfo.html"));
});

// NOTE : 비밀번호 수정
app.get("/users/pwd-edit", (req, res) => {
  res.sendFile(path.join(__dirname, "../community/userInfo/editPassword.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
