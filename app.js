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

const budgetModel = {
 	name: {
 		type: String,
 		unique: true
 	},
 	price: Number,
 	quantity: Number,
	sum: Number
};

const Budget = mongoose.model('Budget', budgetModel);

app.get('/', function(req, res){
	let date = new Date();

	let options = {
		weekday: 'long', 
		day: 'numeric', 
		month: 'long'
	};

	let day = date.toLocaleDateString('en-US', options);
	let sum = 0;
	Budget.find({}, function(err, foundBudget){
		for (let i = 0; i < foundBudget.length; i++){
			sum += foundBudget[i].sum;
		}
		res.render('budgetList', {
		day: day,
		budget: foundBudget,
		sum: sum
	});
	})

});