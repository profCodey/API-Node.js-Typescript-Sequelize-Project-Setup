import { DataTypes, Model } from "sequelize";

import db from "../config/database.config";

interface User {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  password: string;
}

export class UserSchema extends Model<User> {}

UserSchema.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "fullname is required",
        },
        notEmpty: {
          msg: "Please provide your full name",
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "email is required",
        },
        isEmail: {
          msg: "Please provide a valid Email",
        },
      },
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Phone number is required",
        },
        notEmpty: {
          msg: "Please provide a phone number",
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required",
        },
        notEmpty: {
          msg: "Please provide a password",
        },
      },
    },
  },
  {
    sequelize: db,
    tableName: "users",
  }
);
