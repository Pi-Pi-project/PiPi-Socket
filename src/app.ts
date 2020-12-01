import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import http from "http";
import socketio from "socket.io";
import * as dotenv from "dotenv";
import path from "path";
import { sequelize } from "./config/config";
import * as ChatService from "./services/chat";
import * as UserService from "./services/user";
import { ChatRequestDTO } from "./interfaces/chat";

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

io.on("connection", (socket) => {
  console.log("connection");
  socket.on("join", async (id: number) => {
    console.log(id);
    socket.join("room" + id);
  });
  socket.on("chat", async (req: ChatRequestDTO) => {
    console.log(req);
    await ChatService.chat(req);
    await ChatService.updateRecentlyRoom(req.roomId);
    const user = await UserService.findUser(req.userEmail);
    socket.broadcast
      .to("room" + req.roomId)
      .emit(
        "receive",
        user.email,
        user.profileImage,
        user.nickname,
        req.message
      );
  });
  socket.on("leave", (id: number) => {
    socket.leave("room" + id);
  });
  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

server.listen(3000, () => {
  console.log("server on!");
});

export default app;
