# AWS SES Feedback

`aws-ses-feedback` makes it easy to handle feedback from aws ses.

## Install

    npm install aws-ses-feedback

## Example

```js
var sesFeedback = require('aws-ses-feedback')

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
```

## Connect / Express compatible

```js
var app = connect()
  , feedback = sesFeedback()

app.use(feedback)

app.listen(8080)
```

## Options

### `url`

`req.url` must be equal to `options.url`. Defaults to `/`.

### `region`, `account` and `topic`

Used to verify incomming notification. Se [`aws-snsclient` request verification](https://github.com/mattrobenolt/node-snsclient#request-verification) for details.


## Licence

MIT
