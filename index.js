const express = require('express');
const app = express();
const fs = require('fs')
const port = 8080;
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://rubywu0604:Qazj6qup3u60604@clusterml.bpo5zjn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.listen(port, () => {console.log(`listen on the port ${port}`)});
app.use(express.static(__dirname + '/public'));
app.use(express.json({limit: '1mb'}));

app.get("/expenses.html", function (req, res) {
  res.render("expenses");
})

app.get("/incomes.html", function (req, res) {
  res.render("incomes");
})

//expenses
// const expurl = 'https://rubywu0604.github.io/MoneyList/public/expenses.html';
//incomes
// const incurl = 'https://rubywu0604.github.io/MoneyList/public/incomes.html';

app.post('/expenses.html', (request, response) => {
  const data = request.body;
  console.log('I got a request!', data);

  async function run() {
  const db = client.db('moneyList');
  const collection = db.collection('expenses');
  const insertOne = await collection.insertOne(data);
  console.log(insertOne, 'Data inserted!');
  response.json();
}

run().catch(err => {
  response.json({err: 'Could not create a document.'});
})
});