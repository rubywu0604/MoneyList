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
const expSchema  = {
  date: Date,
  time: String,
  tag: String,
  amount: Number
}
const expensesDB = mongoose.model('expenses', expSchema);

app.listen(port, () => {console.log(`listen on the port ${port}`)});
app.use(express.static('/views'));
app.use(express.static('/public'));
app.use(express.json({limit: '1mb'}));

app.set("view engine", "ejs")

app.get("/expenses.html", (request, response) => {
  async function getHistory() {
    const historyExp = await collectionExp.find({}).sort({date:'desc'}).project({_id:0}).toArray();
    console.log('history data form DB', historyExp);
    response.render("expensesView", {
      historyExpList: historyExp
    })
  }
  getHistory().catch(err => {
    response.json({err: 'Could not create a document.'});
  })
})

//expenses
// const expurl = 'https://rubywu0604.github.io/MoneyList/public/expenses.html';
//incomes
<<<<<<< HEAD
// const incapi = 'https://rubywu0604.github.io/MoneyList/public/incomes.html';
=======
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
<<<<<<< HEAD
<<<<<<< HEAD
});
>>>>>>> 5760fa0 (save data into mongodb after server rcv post req)
=======
})
>>>>>>> 84abe23 (amend path: app.use / add fnc: app.set and app.get / retrieve history data from db)
=======
})

>>>>>>> 1aa2538 (re-write app.get)
