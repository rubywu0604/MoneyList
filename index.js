const express = require('express');
const app = express();
const port = 8080;
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://rubywu0604:Qazj6qup3u60604@clusterml.bpo5zjn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

app.listen(port, () => console.info(`listen on port ${port}`));
app.use(express.static(__dirname + '/public'));

app.get("/expenses.html", function (req, res) {
  res.render("expenses");
})

app.get("/incomes.html", function (req, res) {
  res.render("incomes");
})
//
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
//
