import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import http from "http";
import socketio from "socket.io";

const app: Application = express();

const server: http.Server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

io.sockets.on("connection", (socket) => {
  console.log(1);
});

server.listen(5000, () => {
  console.log("server on!");
});

export default app;
