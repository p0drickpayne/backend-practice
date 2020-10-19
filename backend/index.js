const express = require('express')
const sqlite = require('sqlite')
const sqlite3 = require('sqlite3')

const app = express()

app.use(express.json())

let database

sqlite
  .open({ driver: sqlite3.Database, filename: 'database.db' })
  .then((database_) => {
    // Vi kan göra databasanrop här
    database = database_
  })

app.get('/', (request, response) => {
  database.all('SELECT * FROM user').then(user => {
    // response.send('About ' + request.params.userName + '' + user)
    response.send(user)
  })
  
})

app.post('/', (request, response) => {
  database.run('INSERT INTO user (userEmail, userPsw) VALUES (?, ?)', [request.body.userEmail, request.body.userPsw])
  
  .then(() => {
    response.send('Hello POST!')
  }).catch(err => console.log(err))
})

app.listen(3000, () => {
    console.log('Webbtjänsten kan nu ta emot anrop.')
})