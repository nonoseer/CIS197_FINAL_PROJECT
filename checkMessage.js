var Todo = require('./models/TodoModel')
const accountSid = 'ACa01f99e8012286cd46897637783c7418'
const authToken = '7a0da9a6f79d52b39a48ef5b67f074a5'
const client = require('twilio')(accountSid, authToken)
/*
client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '+12058460891',
    to: '+1' + 2672374134,
  })
  .then((message) => console.log(message.sid))
*/
//console.log(Todo.find({}).data)

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

MongoClient.connect(url, function (err, db) {
  if (err) throw err()
  //var dbo = db.db('final-project')
  //console.log(db.)
  dbo = db.db('final-project')

  dbo
    .collection('todomodels')

    .find()
    .toArray()
    .then((data) => {
      if (data.hoursRemaining % data.cadance == 0) {
        client.messages
          .create({
            body: data.content,
            from: '+12058460891',
            to: '+1' + data.contact,
          })
          .then((message) => console.log(message.sid))
      }
    })
  const collection = dbo.collection('todomodels')
  collection.updateMany({}, { $inc: { hoursRemaining: 1 } })

  db.close()
})
