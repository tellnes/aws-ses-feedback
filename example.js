var sesFeedback = require('./')

var feedback = sesFeedback( { url: '/feedback'
                            , region: 'us-east-1'
                            , account: 'xxx'
                            , topic: 'xxx'
                            })

feedback.on('bounce', function(message) {
  console.log(message)
})

feedback.on('complaint', function(message) {
  console.log(message)
})

feedback.on('error', function(err) {
  console.error(err)
})

feedback.listen(8080)
