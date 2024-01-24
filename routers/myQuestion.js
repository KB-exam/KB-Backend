//DB Connect
const db = require('../database/conn/db_conn');

var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

router.use(express.json());

router.post('/myQuestion', (req, res) => {
    //JWT Authentication
    jwt.verify(req.body.jwt, process.env.JWT_SECRETKEY, (err, decoded) => {
        if (err) return res.status(403).send("유효하지 않은 토큰입니다.");
        const empNumber = decoded.param[0];

        const selectSql = `select title, empNumber, questionId from question where empNumber = ${empNumber}`;

        db.query(selectSql, (err, result) => {
            if(err) {
                console.log(err);
                return res.status(405).json({ message: 'SQL Error' });
            }
            return res.status(206).json(result);
        })
    })
});

module.exports = router