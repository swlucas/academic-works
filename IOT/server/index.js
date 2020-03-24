net = require("net");
const readline = require("readline");
const lineReader = require("line-reader");
const PORT = process.env.PORT || 3000;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const server = net.createServer(function(socket) {
  socket.write("Bem vindx\r\n");
  socket.on("data", function(data) {
    console.log(data.toString());
  });
});

server.listen(PORT);
console.log(`Chat server running at port ${PORT}`);
