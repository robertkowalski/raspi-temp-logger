// builtins
var assert = require('assert')
var fs = require('fs')
var sinon = require('sinon')

// misc test helper
var mkdir = require('mkdirp')
var rimraf = require('rimraf')

// main module
var csvLog = require('../index.js')

// settings
var tempdir = __dirname + '/out'

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
})

describe('csv', function () {
  it('converts to csv-logs', function (done) {
    var csv = csvLog(';', '\n')
    var target = fs.createWriteStream(tempdir + '/temp.txt')
    target.on('close', function () {
      var res = fs.readFileSync(tempdir + '/temp.txt')
      assert.equal(res.toString(), '123;22570\n')
      done()
    })
    fs.createReadStream(__dirname + '/fixtures/input.txt')
      .pipe(csv)
      .pipe(target)
  })
  it('has default limiters', function (done) {
    var csv = csvLog()
    var target = fs.createWriteStream(tempdir + '/temp2.txt')
    target.on('close', function () {
      var res = fs.readFileSync(tempdir + '/temp2.txt')
      assert.equal(res.toString(), '123;22570\n')
      done()
    })
    fs.createReadStream(__dirname + '/fixtures/input.txt')
      .pipe(csv)
      .pipe(target)
  })
  it('has a prefix you can specify', function (done) {
    var csv = csvLog(';', '\n', 'ente')
    var target = fs.createWriteStream(tempdir + '/temp3.txt')
    target.on('close', function () {
      var res = fs.readFileSync(tempdir + '/temp3.txt')
      assert.equal(res.toString(), 'ente;22570\n')
      done()
    })
    fs.createReadStream(__dirname + '/fixtures/input.txt')
      .pipe(csv)
      .pipe(target)
  })
  it('can be used to append to a file', function (done) {
    var csv = csvLog(';', '\n', 'ente')
    var target = fs.createWriteStream(tempdir + '/temp-append.txt', {'flags': 'a'})
    target.on('close', function () {
      var csv = csvLog(';', '\n', 'ente')
      var t = fs.createWriteStream(tempdir + '/temp-append.txt', {'flags': 'a'})
      fs.createReadStream(__dirname + '/fixtures/input.txt')
        .pipe(csv)
        .pipe(t)
      t.on('close', function () {
        var res = fs.readFileSync(tempdir + '/temp-append.txt')
        assert.equal(res.toString(), 'ente;22570\nente;22570\n')
        done()
      })
    })
    fs.createReadStream(__dirname + '/fixtures/input.txt')
      .pipe(csv)
      .pipe(target)
  })
})
