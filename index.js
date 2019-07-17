const cool = require('cool-ascii-faces')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

const botController = require('./controllers/messengerBotController')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/cool', (req, res) => res.send(cool()))
  .get('/db', botController.testDb)
  .get('/messenger-bot-load', botController.messengerLoad)
  .post('/messenger-bot-message', botController.handleMessage)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
