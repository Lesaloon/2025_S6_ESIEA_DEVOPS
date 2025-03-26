import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db.config";
import { Business } from "./business.model";
import { User } from "./user.model";

import crypto from "crypto";

export interface ReviewAttributes {
  id: number;
  rating: number;
  comment: string;
  businessId: string;
  userId: string;
}

export interface ReviewCreationAttributes
  extends Optional<ReviewAttributes, "id"> {}

export class Review
  extends Model<ReviewAttributes, ReviewCreationAttributes>
  implements ReviewAttributes
{
  id!: number;
  rating!: number;
  comment!: string;
  businessId!: string;
  userId!: string;

  business?: Business | undefined;
  user?: User | undefined;
}

Review.init(
  {
	id: {
	  type: DataTypes.INTEGER,
	  autoIncrement: true,
	  primaryKey: true,
	  allowNull: false,
	},
	rating: {
	  type: DataTypes.FLOAT,
	  allowNull: false,
	},
	comment: {
	  type: DataTypes.STRING,
	  allowNull: false,
	},
	businessId: {
	  type: DataTypes.INTEGER,
	  allowNull: false,
	  references: {
		model: "businesses",
		key: "id",
	  },
	  onUpdate: 'CASCADE',
      onDelete: 'NO ACTION',
	},
	userId: {
	  type: DataTypes.INTEGER,
	  allowNull: false,
	  references: {
		model: "users",
		key: "id",
	  },
	  onUpdate: 'CASCADE',
	  onDelete: 'NO ACTION',
	},
  },
  {
	sequelize,
	tableName: "reviews",
  }
);

Review.belongsTo(Business, { foreignKey: "businessId" });
