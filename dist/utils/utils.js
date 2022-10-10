"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.generateToken = exports.loginUsersSchema = exports.registerUsersSchema = exports.loginVendorsSchema = exports.registerVendorsSchema = exports.updateVendorsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Vendors to Update their Records
exports.updateVendorsSchema = joi_1.default.object().keys({
    firstname: joi_1.default.string().lowercase().required(),
    lastname: joi_1.default.string().lowercase().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    bvn: joi_1.default.string().length(11).required(),
    phone: joi_1.default.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    local_govt: joi_1.default.string().required(),
    work_address: joi_1.default.string().required(),
    dob: joi_1.default.string().required(),
    state_of_origin: joi_1.default.string().required(),
});
// Vendors can Register on the page.
exports.registerVendorsSchema = joi_1.default.object()
    .keys({
    firstname: joi_1.default.string().lowercase().required(),
    lastname: joi_1.default.string().lowercase().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    bvn: joi_1.default.string().length(11).required(),
    phone: joi_1.default.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    local_govt: joi_1.default.string().required(),
    work_address: joi_1.default.string().required(),
    dob: joi_1.default.string().required(),
    state_of_origin: joi_1.default.string().required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    confirm_password: joi_1.default.ref("password"),
    image_url: joi_1.default.string(),
})
    .with("password", "confirm_password");
//Vendors can Log In
exports.loginVendorsSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
});
// Users can Register on the Website
exports.registerUsersSchema = joi_1.default.object()
    .keys({
    fullname: joi_1.default.string().lowercase().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    phone: joi_1.default.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    confirm_password: joi_1.default.ref("password"),
})
    .with("password", "confirm_password");
//Users can Log in to the Website
exports.loginUsersSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
});
// Json Web Token
const generateToken = (vendors) => {
    const pass = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign({ vendors }, pass, { expiresIn: "7d" });
};
exports.generateToken = generateToken;
//Options
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
