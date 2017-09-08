var express = require('express')
var path = require('path')
var app = express()
app.use(express.static(path.join(__dirname, './static')))

app.get('/', (request, response) => {
  response.render('index.html')
})
var server = app.listen(8000)
var io = require('socket.io').listen(server)
io.sockets.on('connection', function (socket) {
  var count = 0
  socket.on('button_clicked', function (data) {
    console.log(data.action);
    count += 1
    socket.emit('update', {response: count})
  })

  socket.on('button_reset', function (data) {
    count = 0
    socket.emit('update_reset', {response: ''})
  })
})
