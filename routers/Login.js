//DB Connect
const db = require('../database/conn/db_conn');
const bcrypt = require('bcrypt')
//db.connect();

var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

const cors = require('cors')
router.use(cors())
router.use(express.json());

router.post('/login', (req, res) => {
    const select = `select * from employees where empNumber = ${req.body.empNumber}`;
    db.query(select, (err, row, fields) => {
        console.log(row)
        if (err) {
            console.log(err);
            res.status(500).json({"message": 'login fail'});
        }
        else {
            if (row && row.length > 0) {
                let plainPassword = req.body.password;
                let hashedPassword = row[0].password;
                // console.log(req.body.user_pwd)
                bcrypt.compare(plainPassword, hashedPassword, (err, same) => {
                    if (same) {
                        console.log(same)
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
                        // const refreshToken = jwt.sign({},
                        //     process.env.JWT_SECRETKEY,
                        //     {
                        //         expiresIn: '14d',
                        //         issuer: 'dongdong'                    
                        //     })
                        res.json({"message": accsessToken})
                    }
                    else {
                        res.status(401).json({"message": 'wrong password'});
                    }
                })
            }
            else {
                res.status(402).json({"message": 'no user'})
            }
        }
    });
});

module.exports = router