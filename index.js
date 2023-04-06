//Database
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const url = process.env.MONGOLAB_URI;
const client = new MongoClient(url);
const db = client.db('moneyList');
const collectionExp = db.collection('expenses');
const mongoose = require('mongoose');
const expSchema  = new mongoose.Schema({
  date: Date,
  time: String,
  tag: String,
  amount: Number
})
const expensesDB = mongoose.model('expenses', expSchema);
const ObjectId = require('mongodb').ObjectId;

//IMPORT
const express = require('express');
const app = express();
const fs = require('fs')
const port = 8080;
const ejs = require('ejs');

//MIDDLEWARE
app.listen(port, () => {console.log(`listen on the port ${port}`)});
app.use(express.static('/views'));
app.use(express.static('/public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/html', express.static(__dirname + '/public/html'));
app.use(express.json({limit: '1mb'}));
app.set("view engine", "ejs")

//GET & POST
app.get("/expenses.html", (request, response) => {
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

//expenses
// const expurl = 'https://rubywu0604.github.io/MoneyList/public/expenses.html';
//incomes
// const incurl = 'https://rubywu0604.github.io/MoneyList/public/incomes.html';

app.post('/expenses.html', (request, response) => {
  const data = request.body;
  console.log('I got a request!', data);

  async function run() {
  const insertOne = await collectionExp.insertOne(data);
  console.log('Data inserted!', insertOne);
  response.json();
}
run().catch(err => {
  response.json({err: 'Could not create a document.'});
})
})

app.delete('/expenses.html', (request, response) => {
  const selectedId = request.body[0];
  const query = { _id: new ObjectId(selectedId)};
  console.log('Delete request!', query);

  async function run() {
  const deleteMany = await collectionExp.deleteOne(query);
  console.log('Data deleted!', deleteOne);
  response.json();
}
run().catch(err => {
  response.json({err: 'Could not create a document.'});
})
})