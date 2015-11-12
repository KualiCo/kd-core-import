var request = require('request-json')

var apiKey = ''
var baseUrl = 'https://taddgiles-tst.kuali.co/api/v1/'

var client = request.createClient(baseUrl)
client.headers['Authorization'] = 'Bearer ' + apiKey

client.get('users/', function(err, res, body) {
  if(err) return console.log(err)

  body.forEach(function(user) {
    if (user.email === 'tadd@kuali.co' ||
       user.email === 'john@smith.com') return

    client.del('users/' + user.id, function(deleteErr, res, body) {
      if(deleteErr) return console.log(deleteErr)

      console.log('Deleted: ' + user.displayName)
    })
  })
})
