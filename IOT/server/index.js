net = require("net");
const PORT = process.env.PORT || 3000;
const SERVER = { name: "Temperatura_L", status: "ATIVADO", time: 2000 };

const server = net.createServer(function(socket) {
  // socket.write("Bem vindx\r\n");
  handleState(socket);
  // socket.on("data", function(data) {
  //   console.log(data.toString());
  // });
});

const handleState = socket => {
  let connected = true;
  socket.on("close", a => (connected = a));
  socket.on("data", function(data) {
    console.log(data.toString());
    if (!connected) return;
    const [clientName, command, serviceName] = data.toString().split(" ");
    if (
      command.toUpperCase() == "CONECTAR" &&
      serviceName.trim() == SERVER.name
    ) {
      SERVER.status === "ATIVADO" &&
        socket.write(
          `${SERVER.name} ${SERVER.status} ${SERVER.time / 1000}\r\n`
        );
      setInterval(() => {
        connected && socket.write(`${Math.floor(Math.random() * 40)}\r\n`);
        // time += SERVER.time / 1000;
      }, SERVER.time);

      SERVER.status === "DESATIVADO" && socket.write("DESATIVADO");
    }
  });
};

server.listen(PORT);
console.log(`Chat server running at port ${PORT}`);
