var Transform = require('stream').Transform || require('readable-stream').Transform
var fs = require('fs')

module.exports = transform
function transform (d, l, p) {

  var stream = new Transform()

  var first = true
  var time = new Buffer(p || '' + new Date().getTime(), 'utf8')
  d = new Buffer(d || ';', 'utf8')
  l = new Buffer(l || '\n', 'utf8')

  stream._transform = function (chunk, enc, cb) {

    if (first) {
      first = false
      stream.push(time)
      stream.push(d)
    }
    stream.push(chunk)

    cb()
  }

  stream._flush = function (cb) {
    stream.push(l)
    cb()
  }

  return stream
}