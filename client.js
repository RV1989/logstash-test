var net = require('net');
// to connect from docker to server on pc use ip of machine not localhost
var HOST = '192.168.1.121';
var PORT = 3000;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

  console.log('CONNECTED TO: ' + HOST + ':' + PORT);
  // when connected send random data each second
  client.interval = setInterval(send_tcp, 1000)



});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
  // just console log the data
  console.log('DATA: ' + data);



});

// On close
client.on('close', function() {
  // console log closing and stop the timer
  console.log('Connection closed');
  clearInterval(client.interval);
});
// On error
client.on('error', function(err) {
  // console log error
  console.log('error: ' + err.message)
  clearInterval(client.interval);
})


function send_tcp() {
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


  client.write(json + '\n')
  console.log('wrote: ' + json)

}


function randomIntInc(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}
