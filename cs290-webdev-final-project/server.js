var path = require('path')
var express = require('express')
var app = express()
//const data = require("/boardData.json")

var port = 3000

function logReq(req, res, next) {
  console.log("== New request:")
  console.log("  -- req.url:", req.url)
  console.log("  -- req.method:", req.method)
  console.log("  -- req.headers:", req.headers)
  next()
}

app.get('/', function(req, res, next) {
  res.status(200).sendFile(__dirname + '/index.html')
})

app.get('/index.html', function(req, res, next) {
  res.status(200).sendFile(__dirname + '/index.html')
})

app.get('/style.css', function(req, res, next) {
  res.status(200).sendFile(__dirname + '/style.css')
})

app.get('/king.png', function(req, res, next) {
  res.status(200).sendFile(__dirname + '/king.png')
})

app.get('/checker.js', function(req, res, next) {
  res.status(200).sendFile(__dirname + '/checker.js')
})

app.get('*', function(req, res, next) {
  console.log("  -- req.params:", req.params);
  next()
})

app.listen(port, function() {
  console.log("== Server is listening on port", port)
})
