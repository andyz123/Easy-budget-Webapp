const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.use(favicon(__dirname + '/public/faviconandy.ico'));

mongoose.connect('mongodb://localhost:27017/budgetappDB', { useNewUrlParser: true })