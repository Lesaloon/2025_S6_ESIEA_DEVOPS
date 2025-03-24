import { Dialect, Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const DB_NAME = process.env.DB_NAME || "your_database_name";
const DB_USER = process.env.DB_USER || "your_database_user";
const DB_PASSWORD = process.env.DB_PASSWORD || "your_database_password";
const DB_HOST = process.env.DB_HOST || "localhost";
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
const DB_DIALECT = (process.env.DB_DIALECT as Dialect) || "postgres";
const DB_URL = process.env.DB_URL || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const sequelize = new Sequelize(DB_URL, {
  dialect: DB_DIALECT,
  logging: false,
});

const connectDB = async () => {
  try {
	await sequelize.authenticate();
	console.log("Database connection has been established successfully.");
  } catch (error) {
	console.error("Unable to connect to the database:", error);
  }
};

connectDB();
export { sequelize, connectDB };
export default sequelize;