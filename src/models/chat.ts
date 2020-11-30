import Sequelize, { Model } from "sequelize";
import { sequelize } from "../config/config";

export class Chat extends Model {
  id: number;
  message: string;
  roomId: number;
  userEmail: string;
}

Chat.init(
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: Sequelize.STRING(500),
    },
    roomId: {
      type: Sequelize.BIGINT,
      field: "room_id",
    },
    userEmail: {
      type: Sequelize.STRING(50),
      field: "user_email",
    },
  },
  { sequelize, modelName: "chat", tableName: "chat" }
);
