// builtins
var assert = require('assert')
var fs = require('fs')

// misc test helper
var mkdir = require('mkdirp')
var rimraf = require('rimraf')
var sinon = require('sinon')

// settings
var tempdir = __dirname + '/out/'
var fixtures = __dirname + '/fixtures/'

var env = process.env
env.FILE = fixtures + 'input.txt'
env.TEMPLOGPATH = tempdir

// main module
var tl = require('../index.js')


var clock
beforeEach(function (done) {
  clock = sinon.useFakeTimers(123, 'Date');
  rimraf(tempdir, function () {
    mkdir(tempdir, function (err) {
      done()
    })
  })
})
afterEach(function (done) {
  clock.restore()
  rimraf(tempdir, done)
  done()
})

describe('logging temperature', function () {
  it('appends to a file', function (done) {
    tl(function (er) {
      if (er)
        done(er)
      tl(function (er) {
        if (er)
          done(er)
        var file = fs.readFileSync(tl.logFile)
        assert.equal(file.toString(), '123;22750\n123;22750\n')
        done()
      })
    })
  })
})
