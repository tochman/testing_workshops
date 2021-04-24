const express = require('express')
const app = express()

app.route('/').get((request, response) => {
  response.send({ message: 'Our API is working' })
})

app.listen(3000, () => { console.log('The server is up.... Port 3000') })

module.exports = app