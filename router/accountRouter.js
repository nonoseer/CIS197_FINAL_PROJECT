var express = require('express')
var router = express.Router()
var User = require('../models/UserModel.js')
//var backsAuth = require('express-basic-auth')
var isAuthenticated = require('../middlewares/isAuthenticated')
var cors = require('cors')
const session = require('express-session')

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
}
router.use(
  session({
    secret: 'SpookyCat',
    saveUninitialized: true,
    resave: true,
    cookie: {
      httpOnly: false,
      secure: false,
    },
  })
)
/*
const authen = (name, pass) => {
  User.findOne(
    { username: name, password: pass },
    function (err, user) {
      console.log(user)
      if (err) {
        console.log('error', err)
      } else if (user) {
        return true
      } else {
        false
      }
    }
  )
}
const auth = app.use(basicAuth( { authorizer: authen } ))
*/
router.use(cors(corsOptions))
router.post('/signup', function (req, res, next) {
  const c = req.query
  User.findOne(
    { username: req.query.name, password: req.query.password },
    function (err, user) {
      console.log(user)
      if (err) {
        next(err)
      } else if (user) {
        res.status(400).send('username already in use')
      } else {
        var user = new User({
          username: req.query.name,
          password: req.query.password,
          phoneNumber: req.query.phoneNumber,
        })
        user.save(function (err) {
          if (!err) {
            console.log(err)
          } else {
            next(err)
          }
        })
      }
    }
  )
})

router.post('/login', function (req, res, next) {
  console.log(req.query)
  User.findOne(
    { username: req.query.name, password: req.query.password },
    function (err, user) {
      console.log(user)
      if (err) {
        next(err)
      } else if (user) {
        const options = {
          secure: false,
          httpOnly: false,
          domain: '.your.domain.com',
        }
        return res
          .cookie('cookieName', 'cookieValue', options)
          .status(200)
          .send('cookie sent')
      } else {
        next(Error('incorrect credentials'))
      }
    }
  )
})
router.get('/logout', isAuthenticated, function (req, res) {
  if (req.session) {
    req.session = null
  }
  return res.redirect('/')
})

module.exports = router
