var Todo = require('./models/TodoModel')
const accountSid = ''
const authToken = ''
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
/*
client.messages
  .create({
    body: 'WHa up',
    from: '+12058460891',
    to: '+12672374134',
  })
  .then((message) => console.log(message.sid))
*/
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
      for (var k = 0; k < data.length; k++) {
        entry = data[k]
        console.log('data', entry, entry.hoursRemaining % entry.cadance == 0)
        if (entry.hoursRemaining % entry.cadance == 0) {
          client.messages
            .create({
              body: entry.content,
              from: '+12058460891',
              to: '+1' + entry.contact,
            })
            .then((message) => console.log(message.sid))
        }
      }
    })
  const collection = dbo.collection('todomodels')
  collection.updateMany({}, { $inc: { hoursRemaining: 1 } })

  db.close()
})
