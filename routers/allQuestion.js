//DB Connect
const db = require('../database/conn/db_conn');

var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')

router.use(express.json());

router.post('/allQuestion', (req, res) => {
    //SQL
    const select = `select count(*) as cnt from question`;
    //JWT Authentication
    jwt.verify(req.body.jwt, process.env.JWT_SECRETKEY, (err, decoded) => {
        if (err) return res.status(403).send("유효하지 않은 토큰입니다.");
        const empNumber = decoded.param[0];

        console.log(empNumber);

        db.query(select, (err, result) => {
            if(err) {
                console.log(err);
                return res.status(405).json({ message: 'SQL Error' });
            }
            console.log(result)
            return res.status(205).json({ message: result[0].cnt });
        })
    })
});

module.exports = router