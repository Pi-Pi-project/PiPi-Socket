import Sequelize, { Model } from "sequelize";
import { sequelize } from "../config/config";
import { User } from "./user";

export class Portfolio extends Model {
  id: number;
  giturl: string;
  introduce: string;
  title: string;
  userEmail: string;
}

Portfolio.init(
  {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    giturl: {
      type: Sequelize.STRING(50),
    },
    introduce: {
      type: Sequelize.STRING(1000),
    },
    title: {
      type: Sequelize.STRING(50),
    },
    userEmail: {
      type: Sequelize.STRING(50),
      field: "user_email",
    },
  },
  { sequelize, modelName: "portfolio", tableName: "portfolio" }
);
