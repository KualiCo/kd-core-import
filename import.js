var request = require('request-json')
var papa = require('papaparse')
var fs = require('fs')

var apiKey = ''
var baseUrl = 'https://taddgiles-tst.kuali.co/api/v1/'

var client = request.createClient(baseUrl)
client.headers['Authorization'] = 'Bearer ' + apiKey

var csv = fs.readFileSync('./users.csv', 'utf8')

papa.parse(csv, {
  header: true,
  step: function(results, parser) {
    var data = results.data[0]
    var user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    }

    client.post('users/', user, function(err, res, body) {
      if (err) return console.log(err)

      console.log('Added: ' + body.displayName)
    })
  }
})
