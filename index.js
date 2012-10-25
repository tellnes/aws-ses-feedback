var SNSClient = require('aws-snsclient')
  , EventEmitter = require('events').EventEmitter

module.exports = function(options) {
  options = options || {}

  var url = options.url || '/'

  var self = new EventEmitter()

  var client = SNSClient(options, function(err, message) {
    if (err) return self.emit('error', err)

    var data

    try {
      data = JSON.parse(message.Message)
    } catch(e) {
      return self.emit('error', new Error('Error parsing JSON'))
    }

    self.emit(data.notificationType.toLowerCase(), data, message)
    self.emit('feedback', data, message)
  })

  self.handle = function(req, res, next) {
    if (req.method !== 'POST' || req.url !== url) return next()
    client(req, res)
  }

  self.listen = function() {
    var server = require('http').createServer(function() {
      if (req.url === url) {
        if (req.method === 'post') return client(req, res)

        res.writeHead(405)
        res.end('AWS SES Feedback - Method not allowed')
        return
      }

      res.writeHead(404)
      res.end('AWS SES Feedback - Not found')
    })
    return server.listen.apply(server, arguments)
  }

  return self
}
