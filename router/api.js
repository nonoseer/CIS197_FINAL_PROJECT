var express = require('express')
var router = express.Router()
var Todo = require('../models/TodoModel.js')
var cors = require('cors')

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}

router.use(cors(corsOptions))

router.post('/getTodos', (req, res) => {
  Todo.find({ owner: req.query.name }, function (err, result) {
    if (err) {
      return next(err)
    }
    //console.log('api', result)
    console.log('api name', req)
    res.json(result)
  })

  //res.json(todos)
})

router.post('/todos/add', function (req, res, next) {
  var content = req.query.content
  var cadance = req.query.cadance
  var owner = req.query.owner
  console.log(content, '  ', cadance, owner)
  var t = new Todo({
    content: content,
    cadance: cadance,
    hoursRemaining: cadance,
    active: true,
    owner: owner,
  })
  t.save(function (err) {
    if (!err) {
      res.send('ok')
    } else {
      next(err)
    }
  })
})

router.post('/todos/delete', function (req, res, next) {
  var todoId = req.query.tid
  console.log('delete ', todoId)
  Todo.deleteOne({ _id: todoId }, function (err) {
    if (!err) {
      res.send({ success: 'OK' })
    } else {
      next(err)
    }
  })
})

module.exports = router
