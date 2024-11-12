const express = require('express');
const path = require('path');
const app = express();

const PORT = 7777;


app.use(express.static(path.join(__dirname, '../community')));

//로그인
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, '../community/Login.html'))
})

//회원가입
app.get('/SignIn',(req,res)=>{
    res.sendFile(path.join(__dirname,'../community/Signin.html'))
})

//메인
app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, '../community/main.html'));
});

app.listen(PORT,() =>{
    console.log(`Server is running on ${PORT}`)
})