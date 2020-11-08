const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const env = dotenv.config()
dotenvExpand(env)

const express = require('express')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./controllers/authControllers')(app);

app.get('/', (req, res) => {
  res.send("ok")
})

app.listen(3000)