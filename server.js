var net = require('net');

var HOST = '0.0.0.0';
var PORT = 3000;

// create server
var server = net.createServer()
server.listen(PORT, HOST)
console.log("server listening...")
// on connection
server.on('connection', function(socket) {
  // start sending random data each second
  var interval = setInterval(send_tcp, 1000, socket)

  socket.on('close', function() {
    console.log('connetion closed')
    clearInterval(interval);
  });
  socket.on('end', function() {
    console.log('connection ended')
    clearInterval(interval);
  });
  socket.on('error', function(err) {
    console.log('error' + err.message)
    clearInterval(interval);
  })

  socket.on('data', function(data) {
    console.log(data)
  });
})

server.on('error', function(err) {
  console.log("server error: " + err.message)

})


function send_tcp(sock) {
  var obj = [{
      '@tags': 'syserror',
      'ob': '86',
      'hw_id': '432'
    },
    {
      '@tags': 'syserror',
      'ob': '122',
      'FC': '1009'
    },
    {
      '@tags': 'syserror',
      'ob': '86',
      'hw_id': '434'
    },
    {
      '@tags': 'log',
      'el': '1200',
      'perf': '345',
      'downtime': '5'
    },
    {
      '@tags': 'log',
      'el': '1204',
      'perf': '100',
      'downtime': '589'
    },
  ]
  var i = randomIntInc(0, obj.length - 1)
  var json = JSON.stringify(obj[i])
  // send random data and new line
  sock.write(json + '\n')

}


function randomIntInc(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}
