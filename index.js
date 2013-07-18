#!/usr/bin/env node

var fs = require('fs')
var glob = require('glob')
var tsr = require('temperature-stream')
var csv = require('log-csv-stream')

var env = process.env

var logFile = (env.TEMPLOGPATH || '/data/')
      + new Date().getFullYear() + '_' + 'temperature.csv'

if (require.main == module)
  logger(function () {})
else
  module.exports = logger
function logger (cb) {
  glob(env.FILE || '/sys/bus/w1/devices/28-*/w1_slave', function (er, files) {
    if (er)
      cb(er)
    var target = fs.createWriteStream(logFile, {'flags': 'a'})
    target.on('close', function () {
      cb(null)
    })
    fs.createReadStream(files[0])
      .pipe(tsr())
      .pipe(csv())
      .pipe(target)
  })
}

logger.logFile = logFile