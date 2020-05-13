const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const apiRouter = require('./router/api.js')
const accountRouter = require('./router/accountRouter.js')
var cors = require('cors')
const config = {
  credentials: true,
  origin: 'http://localhost:3000',
}
app.options('*', cors(config))

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
app.get('/api/account', (req, res) => {
  var account = ['empty', 'empty2']
  res.json(account)
  console.log('Sent account info')
})
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/final-project',
  { useNewUrlParser: true, useUnifiedTopology: true }
)

app.use('/account', accountRouter)
app.use('/api', apiRouter)
app.get('/favicon.ico', function (_, res) {
  return res.status(404).send()
})
app.get('*', function (_, res) {
  return res.status(404).send()
})

// Middleware for catching any errors
app.use(function (err, _, res) {
  console.log(err)
})

app.listen(process.env.PORT || 8000, function () {
  console.log('App listening on port ' + (process.env.PORT || 8000))
})
