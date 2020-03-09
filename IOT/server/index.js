
net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

net.createServer(function (socket) {

  socket.name = socket.remoteAddress + ":" + socket.remotePort 
  console.log(socket)
  rl.on('line',(input) => {
    const a = {message:input}
    socket.write(`${a}\r\n`)
    console.log(input)
  })

  socket.on('data', function(data) {
    console.log('Received: ' + data);
  });
}).listen(3000);

console.log("Chat server running at port 3000");