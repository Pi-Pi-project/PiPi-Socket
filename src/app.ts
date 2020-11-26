import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import http from "http";
import socketio from "socket.io";
import * as dotenv from "dotenv";
import path from "path";
import { sequelize } from "./config/config";
import router from "./routes";

dotenv.config({ path: path.join(__dirname + "../../.env") });

const app: Application = express();

const server: http.Server = http.createServer(app);
const io = socketio(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

sequelize.sync();

app.use("/", router);

app.use((err, req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: err.message });
});

io.sockets.on("connection", (socket) => {
  console.log(1);
});

server.listen(5000, () => {
  console.log("server on!");
});

export default app;
