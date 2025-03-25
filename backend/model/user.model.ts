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
  avatar?: string;
  role: "user" | "admin";
  businesses: Business[];
  reviews: Review[];
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
  avatar?: string;
  role!: "user" | "admin";
  businesses!: Business[];
  reviews!: Review[];
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
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
    businesses: "",
    reviews: "",
  },
  {
    sequelize,
    tableName: "users",
  }
);

User.beforeCreate(async (user) => {
  user.password = await crypto.hash("sha512", user.password);
  user.id = crypto.randomUUID();
});

User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    user.password = await crypto.hash("sha512", user.password);
  }
});

User.belongsToMany(Business, { through: "UserBusiness" });
Business.belongsToMany(User, { through: "UserBusiness" });
User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });
