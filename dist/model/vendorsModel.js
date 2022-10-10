"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorSchema = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
class VendorSchema extends sequelize_1.Model {
}
exports.VendorSchema = VendorSchema;
VendorSchema.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    firstname: {
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "bvn is required",
            },
        },
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
    },
}, {
    sequelize: database_config_1.default,
    tableName: "vendors",
});
