//DB Connect
const db = require('../database/conn/db_conn');

//db.connect();

var express = require('express');
var router = express.Router();
exports.router = router;

router.use(express.json());

router.post('/login', (req, res) => {
    console.log(req.body)
    const select = `select * from employees where empNumber = ${req.body.empNumber}`;
    db.query(select, (err, row, fields) => {
        if (err) {
            console.log(err);
            res.send('login fail');
        }
        else {
            if (row) {
                // console.log(req.body.user_pwd)
                if (req.body.password === row[0].password) {
                    const param = [req.body.empNumber];
                    res.cookie("user", param);
                    res.send('로그인 성공');
                }
                else {
                    res.status(401).send('wrong password');
                }
            }
            else {
                res.status(402).send('no user')
            }
        }
    });
});

module.exports = router