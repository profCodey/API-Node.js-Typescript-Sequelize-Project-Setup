import { DataTypes, Model } from "sequelize";

import db from "../config/database.config";

interface Vendor {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  bvn: number;
  phone: string;
  local_govt: string;
  work_address: string;
  dob: string;
  state_of_origin: string;
  image_url: string;
}

export class VendorSchema extends Model<Vendor> {}

VendorSchema.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "firstname is required",
        },
        notEmpty: {
          msg: "Please provide your firstname",
        },
      },
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "lastname is required",
        },
        notEmpty: {
          msg: "Please provide your lastname",
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

    bvn: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "bvn is required",
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

    local_govt: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Local govt. is required",
        },
        notEmpty: {
          msg: "Please provide your local government",
        },
      },
    },

    work_address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Work address is required",
        },
        notEmpty: {
          msg: "Please provide your work address",
        },
      },
    },

    dob: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Date of birth is required",
        },
        notEmpty: {
          msg: "Please provide your date of birth",
        },
      },
    },

    state_of_origin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "State of origin is required",
        },
        notEmpty: {
          msg: "Please provide your State of origin",
        },
      },
    },

    image_url: {
      type: DataTypes.STRING,
      defaultValue:
        "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
    },
  },

  {
    sequelize: db,
    tableName: "vendors",
  }
);
