var express = require('express');
var app = express();
//회원가입 로직
const signup = require('./routers/SignUp')
app.use(signup);

//로그인 로직
const login = require('./routers/Login')
app.use(login)
module.exports = app;




