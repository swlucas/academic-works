net = require("net");
const lineReader = require("line-reader");

const PORT = process.env.PORT || 3000;

const trucks = [];
const containers = [];
const trucks_connection = [];

const server = net.createServer(function (socket) {
  handleState(socket);
});

const handleState = (socket) => {
  let connected = true;
  socket.on("close", (a) => (connected = a));

  socket.on("data", function (data) {
    if (!connected) return;
    const info = data.toString().split(" ");

    info[0] === "LIVRE" && handleTruckQueue(info);
    info[0] === "COLETA_FINALIZADA" && handleTruckQueue(info);
    info[0] === "CHEIO" && handleContainerQueue(info);
  });
};

const handleTruckQueue = (info) => {
  const [_, _id] = info;
  const truck = trucks.find((truck) => truck._id == _id.trim());
  !truck
    ? trucks.push({ _id: _id.trim(), status: "LIVRE" })
    : (truck.status = "LIVRE");

  trucks.length !== 0 && handleContainerCollect();
  console.log("CAMINHOES ==>", trucks);
};

const handleContainerQueue = (info) => {
  const [_, _id] = info;
  const container = containers.find((container) => container._id == _id.trim());
  !container
    ? containers.push({ _id: _id.trim(), status: "CHEIO" })
    : (container.status = "CHEIO");

  containers.length !== 0 && handleContainerCollect();
  console.log("CONTAINERS ==>", containers);
};

const handleContainerCollect = () => {
  const truck = trucks.find((truck) => truck.status == "LIVRE");
  const container = containers.find(
    (container) => container.status === "CHEIO"
  );

  truck && container && handleConnect(truck, container);
};

const handleConnect = (truck, container) => {
  const { ip, port } = trucks_connection.find(
    (truck_con) => truck_con._id == truck._id
  );

  const client = new net.Socket();
  client.connect(port, ip, () => {
    client.write(`COLETAR ${container._id}\r\n`);
    containers.splice(0, 1);
    trucks.splice(0, 1);
    console.log(`${truck._id} COLETAR ${container._id}`);
  });
};

const listDevices = () => {
  lineReader.eachLine("trucks_connection.txt", function (line) {
    const [_id, ip, port] = line.split(" ");
    trucks_connection.push({ _id, ip, port });
  });
};

listDevices();

server.listen(PORT);
console.log(`Chat server running at port ${PORT}`);
