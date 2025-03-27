import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db.config";
import { Review } from "./review.model";
import { User } from "./user.model";

export interface BusinessAttributes {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  description: string;
  phone: string;
  website: string;
  hours: { day: string; hours: string }[];
  features: string[];
  ownerId: number;
}

export interface BusinessCreationAttributes
  extends Optional<BusinessAttributes, "id" | "reviewCount" | "rating"> {}

export class Business
  extends Model<BusinessAttributes, BusinessCreationAttributes>
  implements BusinessAttributes
{
  id!: number;
  name!: string;
  category!: string;
  rating!: number;
  reviewCount!: number;
  address!: string;
  description!: string;
  phone!: string;
  website!: string;
  hours!: { day: string; hours: string }[];
  features!: string[];
  ownerId!: number;

  reviews?: Review[] | undefined;
  owner?: User | undefined;
}

Business.init(
  {
    id: {
      type: DataTypes.INTEGER,
	  autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 5,
      },
    },
    reviewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        len: [10, 15],
      },
      defaultValue: null,
    },
    website: {
      type: DataTypes.STRING,
    },
    hours: {
      type: DataTypes.JSONB,
    },
    features: {
      type: DataTypes.JSONB,
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "NO ACTION",
    },
  },
  {
    sequelize, // passing the `sequelize` instance is required
    tableName: "businesses",
  }
);
