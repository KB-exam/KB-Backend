//DB Connect
const db = require('../database/conn/db_conn');

//db.connect();



var express = require('express');
var router = express.Router();

router.use(express.json());

router.post('/signup', (req, res) => {
    const { empNumber, nickname, password } = req.body;
    console.log(empNumber)
    //유효성 검사
    if (!empNumber || !nickname || !password) {
        return res.status(400).json({ error: 'Empty request' });
    }

    const insertQuery = 'INSERT INTO employees VALUES (?, ?, ?)';

    db.query(insertQuery, [empNumber, nickname, password], (err, result) => {
        if (err) {
          console.error('Error inserting data into MySQL:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        
        res.status(201).json({ message: 'User created successfully.' });
    })
});

module.exports = router