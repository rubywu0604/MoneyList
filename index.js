// //expenses
// const expurl = 'https://rubywu0604.github.io/MoneyList/public/html/expensesView';
// //incomes
// const incurl = 'https://rubywu0604.github.io/MoneyList/public/html/incomesView';

//Database
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGOLAB_URI;
const client = new MongoClient(url);
const db = client.db('moneyList');
const collectionExp = db.collection('expenses');
const collectionInc = db.collection('incomes');
const mongoose = require('mongoose');
const Schema  = new mongoose.Schema({
  date: Date,
  time: String,
  tag: String,
  amount: Number
})

mongoose.model('expenses', Schema);
mongoose.model('incomes', Schema);
const ObjectId = require('mongodb').ObjectId;

//IMPORT
const express = require('express');
const app = express();
const fs = require('fs')
const port = process.env.PORT || 8080;
const ejs = require('ejs');

//MIDDLEWARE
app.listen(port, () => {console.log(`listen on the port ${port}`)});
app.use(express.static('/views'));
app.use(express.static('/public'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/'));
app.use(express.json({limit: '1mb'}));
app.set("view engine", "ejs");

//history list
app.get('/expenses.html', (request, response) => {
  async function getHistory() {
    const historyExp = await collectionExp.find({}).sort({date:'desc'}).toArray();
    // console.log('history data from DB', historyExp);
    response.render("expensesView", {
      historyExpList: historyExp,
    })
  }
  getHistory().catch(err => {
    response.json({err: 'Could not create a document.'});
  })
})

app.get('/incomes.html', (request, response) => {
  async function getHistory() {
    const historyInc = await collectionInc.find({}).sort({date:'desc'}).toArray();
    response.render("incomesView", {
      historyIncList: historyInc,
    })
  }
  getHistory().catch(err => {
    response.json({err: 'Could not create a document.'});
  })
})

//insertOne
app.post('/expenses.html', (request, response) => {
  const data = request.body;
  async function run() {
  const insertOne = await collectionExp.insertOne(data);
  console.log('Expense Data inserted!', insertOne);
  response.json();
}
run().catch(err => {
  response.json({err: 'Could not create a document.'});
})
})

app.post('/incomes.html', (request, response) => {
  const data = request.body;
  async function run() {
  const insertOne = await collectionInc.insertOne(data);
  console.log('Income Data inserted!', insertOne);
  response.json();
}
run().catch(err => {
  response.json({err: 'Could not create a document.'});
})
})

//deleteMany
app.delete('/expenses.html', (request, response) => {
  const selectedId = request.body.map(e => new ObjectId(e));
  const query = {_id: { $in: selectedId}};
  async function run() {
  const deleteMany = await collectionExp.deleteMany(query);
  console.log('Expense Data deleted!', deleteMany);
  response.json();
}
run().catch(err => {
  response.json({err: 'Could not create a document.'});
})
})

app.delete('/incomes.html', (request, response) => {
  const selectedId = request.body.map(e => new ObjectId(e));
  const query = {_id: { $in: selectedId}};
  async function run() {
  const deleteMany = await collectionInc.deleteMany(query);
  console.log('Income Data deleted!', deleteMany);
  response.json();
}
run().catch(err => {
  response.json({err: 'Could not create a document.'});
})
})