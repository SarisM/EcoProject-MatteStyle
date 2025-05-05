const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { createServer } = require("http");
const setupUserRoutes = require('./server/routes/userRoutes');

const app = express();
const PORT = 5050
const httpServer = createServer(app);

const io = new Server(httpServer, {
  path: "/real-time",
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use("/client1", express.static(path.join(__dirname, "client1")));
app.use("/client2", express.static(path.join(__dirname, "client2")));

// Setup routes
app.use('/', setupUserRoutes(io));

httpServer.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});