net = require("net");
const PORT = process.env.PORT || 3000;
const SERVER = { name: "Umidade", status: "ATIVADO", time: 5000 };

const server = net.createServer(function(socket) {
  socket.write("Bem vindx\r\n");
  handleState(socket);
  socket.on("data", function(data) {
    console.log(data.toString());
  });
});

const handleState = socket => {
  let time = 0;
  SERVER.status === "ATIVADO" &&
    setInterval(() => {
      time += SERVER.time / 1000;
      socket.write(`${SERVER.name} ${SERVER.status} ${time} `);
    }, SERVER.time);

  SERVER.status === "DESATIVADO" && socket.write("DESATIVADO");
};

server.listen(PORT);
console.log(`Chat server running at port ${PORT}`);
