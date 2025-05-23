import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db.config";
import { Business } from "./business.model";
import { Review } from "./review.model";
import crypto from "crypto";

export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: "user" | "admin";
  businesses?: Business[];
  reviews?: Review[];
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "businesses" | "reviews"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  id!: number;
  email!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  role!: "user" | "admin";
  businesses?: Business[];
  reviews?: Review[];
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
	  autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    }
  },
  {
    sequelize,
    tableName: "users",
  }
);

User.beforeCreate(async (user) => {
  user.password = crypto.createHash("sha512").update(user.password).digest("hex");
});

User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    user.password = crypto.createHash("sha512").update(user.password).digest("hex");
  }
});