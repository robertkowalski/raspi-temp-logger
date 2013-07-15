[![Build Status](https://travis-ci.org/robertkowalski/log-csv-stream.png?branch=master)](https://travis-ci.org/robertkowalski/log-csv-stream)
[![Dependency Status](https://gemnasium.com/robertkowalski/log-csv-stream.png)](https://gemnasium.com/robertkowalski/log-csv-stream)


#log-csv-stream

Designed to work with [https://github.com/robertkowalski/temperature-stream](https://github.com/robertkowalski/temperature-stream),
but you can log all values as CSV

```javascript
  var csv = csvLog()
  var target = fs.createWriteStream(__dirname + '/temp.txt')
  fs.createReadStream(__dirname + '/input.txt')
    .pipe(csv)
    .pipe(target) // 1373750981527;22570\n
```

You can define delimiter and line-end:

```javascript
  var csv = csvLog(',', '|')
  var target = fs.createWriteStream(__dirname + '/temp.txt')
  fs.createReadStream(__dirname + '/input.txt')
    .pipe(csv)
    .pipe(target) // 1373750981527,22570|
```

You can even use custom timestamps! This is so amazing!

```javascript
  var csv = csvLog(';', '\n', new Date().toString())
  var target = fs.createWriteStream(__dirname + '/temp.txt')
  fs.createReadStream(__dirname + '/input.txt')
    .pipe(csv)
    .pipe(target) // So Jul 14 2013 12:32:33 GMT+0200 (CEST);22570\n
```