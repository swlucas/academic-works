const net = require("net");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new net.Socket();
client.connect(3000, "127.0.0.1", function() {
  console.log("Connected");
  client.write("Hello, server! Love, Client.");
});

rl.on("line", input => {
  client.write(`${input}\r\n`);
  console.log(input);
});

client.on("data", function(data) {
  console.log("Received: " + data);
  // client.destroy(); // kill client after server's response
});

client.on("close", function() {
  console.log("Connection closed");
});
