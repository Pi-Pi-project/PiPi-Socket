import Sequelize, { Model } from "sequelize";
import { sequelize } from "../config/config";

export class ChatMember extends Model {
  roomId: number;
  userEmail: string;
}

ChatMember.init(
  {
    roomId: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      field: "room_id",
    },
    userEmail: {
      type: Sequelize.STRING(50),
      primaryKey: true,
      field: "user_email",
    },
  },
  { sequelize, modelName: "chat_member" }
);
