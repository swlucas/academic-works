const net = require("net");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new net.Socket();
client.connect(14361, "0.tcp.ngrok.io", function() {
  console.log("Connected");
  client.write("Hello, server! Love, Client.");
});

rl.on("line", input => {
  client.write(`${input}\r\n`);
});

client.on("data", function(data) {
  console.log("Received: " + data);
});

client.on("close", function() {
  console.log("Connection closed");
});
