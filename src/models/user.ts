import Sequelize, { Model } from "sequelize";
import { sequelize } from "../config/config";
import { Chat } from "./chat";
import { ChatMember } from "./chatMember";
import { Portfolio } from "./portfolio";

export class User extends Model {
  email: string;
  password: string;
  nickname: string;
  profileImage: string;
  giturl: string;
  introduce: string;
  readonly admin: "ADMIN" | "USER";
  firstPortfolio: string;
  secondPortfolio: string;
}

User.init(
  {
    email: {
      type: Sequelize.STRING(50),
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING(100),
    },
    nickname: {
      type: Sequelize.STRING(20),
    },
    profileImage: {
      type: Sequelize.STRING(50),
      field: "profile_image",
    },
    giturl: {
      type: Sequelize.STRING(100),
    },
    introduce: {
      type: Sequelize.STRING(200),
    },
    admin: {
      type: Sequelize.ENUM("ADMIN", "USER"),
    },
    firstPortfolioId: {
      type: Sequelize.BIGINT,
      field: "first_portfolio_id",
    },
    secondPortfolioId: {
      type: Sequelize.BIGINT,
      field: "second_portfolio_id",
    },
  },
  { sequelize, modelName: "user" }
);

User.hasOne(Portfolio, { foreignKey: "userEmail", sourceKey: "email" });

User.hasMany(ChatMember, { foreignKey: "userEmail", sourceKey: "email" });
ChatMember.belongsTo(User, { foreignKey: "userEmail" });

User.hasMany(Chat, { foreignKey: "userEmail", sourceKey: "email" });
Chat.belongsTo(User, { foreignKey: "userEmail" });
