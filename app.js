var express = require('express');
const db = require('./database/conn/db_conn');
db.connect();
var app = express();



module.exports = app;
