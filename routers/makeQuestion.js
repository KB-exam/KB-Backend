//DB Connect
const db = require('../database/conn/db_conn');

//db.connect();

var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const cors = require('cors')
router.use(cors())
router.use(express.json());
const insert_4 = 'insert into question (title, content, type, choice1, choice2, choice3, choice4, answer) values (?,?,?,?,?,?,?,?);'
const insert_2 = 'insert into question (title, content, type, answer) values (?,?,?,?)'
router.post('/makeQuestion', (req, res) => {
    if (req.body.type == 2){
        db.query(insert_2, [req.body.title, req.body.content, req.body.type, req.body.answer], (err, row, fields) => {
            if (err) {
                console.log(err);
                res.send('make fail');
            }
            else {
                res.send('suc OX')
            }
        });
    }
    else if (req.body.type == 4){
        db.query(insert_4, [req.body.title, req.body.content, req.body.type, req.body.choice1, req.body.choice2, req.body.choice3, req.body.choice4, req.body.answer], (err, row, fields) => {
            if (err) {
                console.log(err);
                res.send('make fail');
            }
            else {
                res.send('suc 4')
            }
        });
    }
});

module.exports = router