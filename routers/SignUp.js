//DB Connect
const db = require('../database/conn/db_conn');
const bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();
const cors = require('cors')
router.use(cors())
router.use(express.json());

router.post('/signup', (req, res) => {
    const { empNumber, nickname, password } = req.body;

    //유효성 검사
    if (!empNumber || !nickname || !password) {
        return res.status(400).json({ error: 'Empty request' });
    }

    const insertQuery = 'INSERT INTO employees VALUES (?, ?, ?)';

    //Password Encrypt
    let afterPassword = '';

    bcrypt.hash(password, 10, function(err, hash) {
        try{
            afterPassword = hash;
            db.query(insertQuery, [empNumber, nickname, afterPassword], (err, result) => {
                if (err) {
                  console.error('Error inserting data into MySQL:', err);
                  return res.status(500).json({ error: 'Internal server error' });
                }
                res.status(201).json({ message: 'User created successfully.' });
            })
        }
        catch(err){//예외처리
            console.log(err);
        }
    });

});

module.exports = router