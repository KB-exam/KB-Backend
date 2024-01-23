var express = require('express');
var app = express();

//회원가입 로직
const signup = require('./routers/SignUp')
app.use(signup);

module.exports = app;
