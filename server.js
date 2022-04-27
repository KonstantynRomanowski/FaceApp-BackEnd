const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const pgDatabase = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : '5432',
    user : 'Konstantyn_Wielki',
    password : '',
    database : 'smart-face-app'
  }
});

const app = express();

app.use(cors())
app.use(express.json()); 


app.get('/', (req, res)=> {res.send('success')})
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, bcrypt, pgDatabase)})
app.post('/register', (req, res) => {register.handleRegister(req, res, pgDatabase, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, pgDatabase)})
app.put('/image', (req, res) => {image.handleImage(req, res, pgDatabase)})
app.post('/imageurl', (req, res) => {image.handleAPICall(req, res)})

app.listen(3000, ()=> {
  console.log('app is running on port 3000');
})
