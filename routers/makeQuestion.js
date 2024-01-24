//DB Connect
const db = require('../database/conn/db_conn');

//db.connect();

var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const cors = require('cors')
router.use(cors())
router.use(express.json());
const insert_4 = 'insert into question (title, content, type, category, empNumber, choice1, choice2, choice3, choice4, answer) values (?,?,?,?,?,?,?,?,?,?);'
const insert_2 = 'insert into question (title, content, type, category, empNumber, answer) values (?,?,?,?,?,?)'
router.post('/makeQuestion', (req, res) => {
    jwt.verify(req.body.accessToken, process.env.JWT_SECRETKEY, (err, decoded) => {
        if (err) return res.status(403).json({"message": "유효하지 않은 토큰입니다."});
        const user = decoded.param[0];
        db.query('select * from employees where empNumber = ?', user, (err, row, fields) => {
            if (err) {
                console.log(err);
                res.json({"message": 'something wrong'});
            }
            else {
                if (row && row.length > 0) {
                    if (req.body.type == 2){
                        db.query(insert_2, [req.body.title, req.body.content, req.body.type, req.body.category, user, req.body.answer], (err, row, fields) => {
                            if (err) {
                                console.log(err);
                                res.json({"message": 'make fail'});
                            }
                            else {
                                res.json({"message": 'suc OX'})
                            }
                        });
                    }
                    else if (req.body.type == 4){
                        db.query(insert_4, [req.body.title, req.body.content, req.body.type, req.body.category, user, req.body.choice1, req.body.choice2, req.body.choice3, req.body.choice4, req.body.answer], (err, row, fields) => {
                            if (err) {
                                console.log(err);
                                res.json({"message": 'make fail'});
                            }
                            else {
                                res.json({"message":'suc 4'})
                            }
                        });
                    }
                }
                else {
                    res.status(402).json({"message": 'no user'})
                }
            }
            
        })
    });
    
});

module.exports = router