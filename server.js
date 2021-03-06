const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'rebby',
    password : 'reebecca',
    database : 'face-recognition'
  }
});

app.use(cors()),
app.use(bodyParser.json())	
app.get('/', (req, res) => {res.send(database.users)})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfile(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', image.handleApiCall)
app.listen(5000, () => {console.log(`app is running at port 5000`)})
