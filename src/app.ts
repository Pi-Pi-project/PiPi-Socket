import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import http from "http";
import socketio from "socket.io";
import * as dotenv from "dotenv";
import path from "path";
import { sequelize } from "./config/config";
import * as ChatService from "./services/chat";
import { ChatRequestDTO }} from "./interfaces/chat";

dotenv.config({ path: path.join(__dirname + "../../.env") });

const app: Application = express();

const server: http.Server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

sequelize.sync();

app.use((err, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: err.message });
});

app.set("jwt-secret", process.env.JWT_SECRET);

io.sockets.on("connection", (socket) => {
  socket.on("join", async (id: number) => {
    socket.join("room" + id);
  });
  socket.on("chat", async (req: ChatRequestDTO) => {
    await ChatService.chat(req);
    io.to("room" + req.roomId).emit("chat", req.userEmail, req.message);
  });
});

server.listen(3000, () => {
  console.log("server on!");
});

export default app;
