net = require("net");
const readline = require("readline");
const lineReader = require("line-reader");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

net
  .createServer(function(socket) {
    handleInput();

    socket.on("data", function(data) {
      console.log("Received: " + data);
    });
  })
  .listen(3000);

const handleInput = () => {
  rl.on("line", input => {
    const a = { message: input };
    socket.write(`${a}\r\n`);
    console.log(input);
  });
};

const listDevices = () => {
  lineReader.eachLine("lista_dispositivos.txt", function(line) {
    const [name, ip, port] = line.split(" ");
    console.log({ name, ip, port });
  });
};
listDevices();

console.log("Chat server running at port 3000");
