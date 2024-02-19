const express = require('express');
const fs = require('fs');
const modules = require('./modules');
const users = modules.users;
const app = express();
const port = 3000;
// const router = require('express').Router();
// const path = require('path');
// var storage = [];
// var userCache = [];
// var userCache2 = modTest.users;



// app.get('/', (req, res) => {
//   express.static('./pages/meal_planner')
// })

// Serves Static Directory to Homepage
// app.use('/', express.static('./pages/meal_planner'))

app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/', express.static('./pages/fetchTest'))

app.get('/users', (req, res) => {
  console.log(users.userList);
  res.send(users.userList);
})

app.post('/users', (req, res) => {
  var newUserRequest = users.addUser(req.body);
  console.log(newUserRequest);
    res.send({ newUserRequest });
})

app.put('/users', (req, res) => {
  // var newUserRequest = users.updateUser(req.body);
  // console.log(newUserRequest);
  console.log(req);
    // res.send({ newUserRequest });
})

app.delete('/users', (req, res) => {
  var deleteId = req.body.deleteId;
    deleteUser(deleteId);
})

app.get('/test', (req, res) => {
  fs.readFile('./database/newList.json', function(err, data) {
    var newListP = JSON.parse(data);
      console.log(storage);
    res.send(newListP);
  })
})

app.post('/newPost', (req, res) => {
  var newPostData = req.body;
  console.log(newPostData);
  userCache.push(newPostData)
})

app.get('/moduleTest', (req, res) => {
  // var test = modTest.testMod();
  console.log(modTest);
  console.log(modTest.testMod());
  modTest.testTwo();
  console.log(modTest.users);
  var length = modTest.users.length;
  console.log(length);
  var num = length++;
  console.log(num);
  var content = {name: num};
  modTest.users.push(content);
  console.log(modTest.users);
  modTest.userTest.verifyNewUser({id: '100', nameFirst: 'Wesley', nameLast: 'DuBose'})
})

app.get('/third', (req, res) => {
  // writeFile().then(readFile2);
  fs.readFile('./database/projectList.json', function(err, data) {
    var parse = JSON.parse(data);
    console.log(parse);
    res.send(parse);
  });
})