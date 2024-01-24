//DB Connect
const db = require('../database/conn/db_conn');
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const cors = require('cors')
router.use(cors())
router.use(express.json());
router.post('/getExam', (req, res) => {
    jwt.verify(req.body.accessToken, process.env.JWT_SECRETKEY, (err, decoded) => {
        if (err) return res.status(403).send("유효하지 않은 토큰입니다.");
        db.query(`SELECT * FROM question ORDER BY RAND() LIMIT ${req.body.quantity}`, (err, row, fields) => {
            if (err) {
                console.log(err);
                res.json({"message": 'something wrong'});
                
            }
            else {
                if (row && row.length > 0) {
                    res.status(200).json({"message": row})
                }
                else {
                    res.status(402).json({"message": 'no user'})
                }
            }
            
        })
    });
    
});

module.exports = router