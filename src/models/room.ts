import Sequelize, { Model } from "sequelize";
import { sequelize } from "../config/config";
import { Chat } from "./chat";
import { ChatMember } from "./chatMember";

export class Room extends Model {
  id: number;
  title: string;
  coverImg: string;
}

Room.init(
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(50),
    },
    coverImg: {
      type: Sequelize.STRING(50),
      field: "cover_img",
    },
  },
  { sequelize, modelName: "room", tableName: "room" }
);

Room.hasMany(ChatMember, { foreignKey: "roomId", sourceKey: "id" });
ChatMember.belongsTo(Room, { foreignKey: "roomId" });

Room.hasMany(Chat, { foreignKey: "roomId", sourceKey: "id" });
Chat.belongsTo(Room, { foreignKey: "roomId" });
