//DB Connect
const db = require('../database/conn/db_conn');

//db.connect();

var express = require('express');
var router = express.Router();
exports.router = router;

router.use(express.json());

router.post('/login', (req, res) => {
    const select = 'select * from employees where empNumber = ?';
    db.query(select, req.body.empNumber, (err, row, fields) => {
        if (err) {
            console.log(err);
            res.send('login fail');
        }
        else {
            console.log(row);
            // console.log(req.body.user_pwd)
            if (req.body.password === row[0].password) {
                const param = [req.body.empNumber];
                res.cookie("user", param);
                res.send('로그인 성공');
            }
            else {
                res.send('wrong password');
            }
        }
    });
});

module.exports = router