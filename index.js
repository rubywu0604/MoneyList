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

// async function run() {
//   try {
//     await client.connect();
//     const db = client.db('moneyList');
//     const collection = db.collection('expenses');
//
//     const first = await collection.insertOne({"date":"mm-dd-yy" , "tag": "dinner", "amount": 200, "Notes": null});
//     console.log(first);
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.error);


//expenses
// const expapi = 'https://rubywu0604.github.io/MoneyList/public/expenses.html';

app.post('/expenses.html', (request, response) => {
  console.log('I got a request!')
  const data = request.body;
  console.log(data);
  response.json(request.body);
});
//incomes
// const incapi = 'https://rubywu0604.github.io/MoneyList/public/incomes.html';