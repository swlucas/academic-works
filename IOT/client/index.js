const net = require("net");
const readline = require("readline");
const lineReader = require("line-reader");
const NAME = "Temperatura_L";

const devices = [];

const listDevices = () => {
  lineReader.eachLine("lista_dispositivos.txt", function(line) {
    const [name, ip, port] = line.split(" ");
    devices.push({ name, ip, port });
  });
};

listDevices();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new net.Socket();

const handleConnect = ({ name, ip, port }) => {
  client.connect(port, ip, function() {
    client.write(`${NAME} CONECTAR ${name}\r\n`);
    // client.write("Hello, server! Love, Client.");
  });
};

rl.on("line", input => {
  // client.write(`${input}\r\n`);
  handleTerminal(input);
});

client.on("data", function(data) {
  console.log("Received: " + data);
});

client.on("close", function() {
  console.log("Connection closed");
});
const handleListDevices = () => {
  console.log(devices);
};

const handleTerminal = input => {
  const command = input.split(" ");
  let device =
    command.length === 3 && devices.find(({ name }) => name === command[2]);

  command.length === 3 &&
    command[0] === NAME &&
    command[1] === "CONECTAR" &&
    device &&
    handleConnect(device);

  command == "devices" && handleListDevices();
};
