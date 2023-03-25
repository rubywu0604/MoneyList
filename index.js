const express = require('express');
const app = express();
const fs = require('fs')
const port = 8080;
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://rubywu0604:Qazj6qup3u60604@clusterml.bpo5zjn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
const db = client.db('moneyList');
const collectionExp = db.collection('expenses');
const ejs = require('ejs');
const mongoose = require('mongoose');

app.listen(port, () => {console.log(`listen on the port ${port}`)});
app.use(express.static('/views'));
app.use(express.static('/public'));
app.use(express.json({limit: '1mb'}));

app.set("view engine", "ejs")

app.get("/expenses.html", async function (req, res) {  
  let historyExp = await collectionExp.find({}).sort({date:'desc'}).project({_id:0}).toArray();
  console.log(historyExp);
  res.render("expensesView", historyExp.forEach((element) => {
    console.log(element);
      historyExpDate = element.date;
      historyExpTime = element.time;
      historyExpTag = element.tag;
      historyExpAmount = element.amount;
  })
 )
})
  //  {
  //   historyExpDate: historyExp[0].date,
  //   historyExpTime: historyExp[0].time,
  //   historyExpTag: historyExp[0].tag,
  //   historyExpAmount: historyExp[0].amount
  // });

app.get("/incomes.html", function (req, res) {
  res.render("incomesView", {
  });
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
  console.log(insertOne, 'Data inserted!');
  response.json();
}
run().catch(err => {
  response.json({err: 'Could not create a document.'});
})
})