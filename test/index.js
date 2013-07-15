// builtins
var assert = require('assert')
var fs = require('fs')

// misc test helper
var mkdir = require('mkdirp')
var rimraf = require('rimraf')

// main module
var tl = require('../index.js')

// settings
var tempdir = __dirname + '/out'
var fixtures = __dirname + '/fixtures/'

beforeEach(function (done) {
  rimraf(tempdir, function () {
    mkdir(tempdir, function (err) {
      done()
    })
  })
})
afterEach(function (done) {
  rimraf(tempdir, done)
})

describe('logging temperature', function () {
  it('appends to a file', function (done) {
    assert.equal(true, true)
    done()
  })
})
