//DB Connect
const db = require('../database/conn/db_conn');

//db.connect();

var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
exports.router = router;

router.use(express.json());

router.post('/login', (req, res) => {
    console.log(req.body)
    const select = `select * from employees where empNumber = ${req.body.empNumber}`;
    db.query(select, (err, row, fields) => {
        console.log(row)
        if (err) {
            console.log(err);
            res.send('login fail');
        }
        else {
            if (row && row.length > 0) {
                // console.log(req.body.user_pwd)
                if (req.body.password === row[0].password) {
                    const param = [req.body.empNumber]
                    const accsessToken = jwt.sign(
                        {
                          param
                        },
                        process.env.JWT_SECRETKEY,
                        {
                            expiresIn: "5d",
                            issuer: "dogndong"
                        }
                    )
                    const refreshToken = jwt.sign({},
                        process.env.JWT_SECRETKEY,
                        {
                            expiresIn: '14d',
                            issuer: 'dongdong'                    })
                    res.cookie("user",accsessToken)
                    res.cookie("setter",refreshToken);
                    res.send(param);
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