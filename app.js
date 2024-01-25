var express = require('express');
var app = express();
//회원가입 로직
const signup = require('./routers/SignUp')
app.use(signup);

//로그인 로직
const login = require('./routers/Login')
app.use(login)
module.exports = app;

const makeQuestion = require('./routers/makeQuestion')
app.use(makeQuestion)

const getExam = require('./routers/getExam')
app.use(getExam)

const deleteQuestion = require('./routers/deleteQuestion')
app.use(deleteQuestion)

const allQuestion = require('./routers/allQuestion')
app.use(allQuestion)
const myQuestion = require('./routers/myQuestion')
app.use(myQuestion)