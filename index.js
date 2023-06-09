//IMPORT
const express = require('express');
const app = express();
const fs = require('fs')
const port = process.env.PORT || 8080;
const ejs = require('ejs');
const { MongoClient } = require('mongodb');
const { sendEmail } = require('./sent_mail.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const url = process.env.MONGOLAB_URI;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// connect to MongoDB server
client.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Connected to MongoDB server.');
});

//setting collection and schema
const db = client.db('moneyList');
const collectionExp = db.collection('expenses');
const collectionInc = db.collection('incomes');
const collectionUser = db.collection('user');
const Schema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
});

const userDB = mongoose.model('user', Schema);
const expensesDB = mongoose.model('expenses', Schema);
const incomesDB = mongoose.model('incomes', Schema);
const ObjectId = require('mongodb').ObjectId;

//MIDDLEWARE
app.listen(port, () => {console.log(`listen on the port ${port}`)});
app.use(express.static('/views'));
app.use(express.static('/public'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/', express.static(__dirname + '/'));
app.use(express.json({limit: '1mb'}));
app.set("view engine", "ejs");

//get page
app.get('/signup', (request, response) => {
  response.render('signupView');
})
app.get('/', (request, response) => {
  response.render('loginView');
})

app.get(`/expenses/:userId`, (request, response) => {
  const userId = request.params.userId;
  async function getHistory() {
    const historyExp = await collectionExp.find({userId: userId}).sort({date:'desc'}).toArray();
    // console.log('history data from DB', historyExp);
    response.render("expensesView", {
      historyExpList: historyExp,
      userName: userId
    })
  }
  getHistory().catch(err => {
    response.json({err: 'Could not create a document.'});
  })
})

app.get(`/incomes/:userId`, (request, response) => {
  const userId = request.params.userId;
  async function getHistory() {
    const historyInc = await collectionInc.find({userId: userId}).sort({date:'desc'}).toArray();
    response.render("incomesView", {
      historyIncList: historyInc,
      userName: userId
    })
  }
  getHistory().catch(err => {
    response.json({err: 'Could not create a document.'});
  })
})

//Signup and Login
app.post('/signup', (request, response) => {
  const userData = request.body;
  async function run() {
      const check = await collectionUser.findOne({userId: userData.userId});
      if(check){
        response.json('exist');
      }else{
        const insertUser = await collectionUser.insertOne(userData);
        console.log('New User Data inserted!', insertUser);

        // Send welcome email to new user
        if (userData.userEmail) {
          sendEmail(userData.userEmail, 'Welcome to My Money List!', `Hi, ${userData.userId}. Thank you for signing up for "My Money List".`);
        }

        response.json('notexist');
      }
   }
   run().catch(err => {
     console.log(err);
     response.json('notexist');
   })
})

app.post('/', (request, response) => {
  const userData = request.body;
  async function run() {
    try {
      const user = await collectionUser.findOne({userId: userData.userId});
      if(!user) {
        throw new Error('User not found');
      }
      if(user.userPassword !== userData.userPassword) {
        throw new Error('Incorrect password');
      }
      response.json({userId: userData.userId});
    } catch(err) {
      console.log(err);
      if(err.message === 'User not found') {
        response.status(404).json({error: 'User not found'});
      } else if(err.message === 'Incorrect password') {
        response.status(401).json({error: 'Incorrect password'});
      } else {
        response.status(500).json({error: 'Internal server error'});
      }
    }
  }
  run();
})


//insertOne
app.post(`/expenses/:userId`, (request, response) => {
  const data = request.body;
  const userId = request.body.userId;
  async function run() {
  const insertOne = await collectionExp.insertOne({ ...data, userId });
  console.log('Expense Data inserted!', insertOne);
  response.json();
}
run().catch(err => {
  response.json({err: 'Could not create a document.'});
})
})

app.post(`/incomes/:userId`, (request, response) => {
  const data = request.body;
  const userId = request.body.userId;
  async function run() {
  const insertOne = await collectionInc.insertOne({ ...data, userId });
  console.log('Income Data inserted!', insertOne);
  response.json();
}
run().catch(err => {
  response.json({err: 'Could not create a document.'});
})
})

//deleteMany
app.delete(`/expenses/:userId`, (request, response) => {
  const userId = request.params;
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

app.delete(`/incomes/:userId`, (request, response) => {
  const userId = request.params;
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
