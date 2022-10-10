"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUsers = exports.createUser = void 0;
const uuid_1 = require("uuid");
const usersModel_1 = require("../model/usersModel");
const utils_1 = require("../utils/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * Create User API
 * @param req
 * @param res
 * @param next
 */
async function createUser(req, res, next) {
    const id = (0, uuid_1.v4)();
    // console.log(req.body);
    try {
        const validationResult = utils_1.registerUsersSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const duplicateEmail = await usersModel_1.UserSchema.findOne({
            where: { email: req.body.email },
        });
        if (duplicateEmail) {
            return res.status(409).json({
                msg: "Email is used, please change email",
            });
        }
        const duplicatePhone = await usersModel_1.UserSchema.findOne({
            where: { phone: req.body.phone },
        });
        if (duplicatePhone) {
            return res.status(409).json({
                msg: "Phone number is used",
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const ConfirmPasswordHash = await bcryptjs_1.default.hash(req.body.confirm_password, 8);
        const userData = {
            id,
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            password: passwordHash,
            confirm_password: ConfirmPasswordHash,
        };
        const userDetails = await usersModel_1.UserSchema.create(userData);
        // const id = userDetails?.id;
        const token = (0, utils_1.generateToken)({ id });
        res.status(201).json({
            status: "Success",
            token,
            message: "Successfully created a user",
            data: userDetails,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Failed",
            Message: "Unable to create a user",
        });
    }
}
exports.createUser = createUser;
/**
 * Get All Users API
 * @param req
 * @param res
 * @param next
 */
async function getAllUsers(req, res, next) {
    try {
        const userDetails = await usersModel_1.UserSchema.findAll();
        res.status(201).json({
            status: "Success",
            message: "Successfully get all users",
            data: userDetails,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            Message: "Something went all",
        });
    }
}
exports.getAllUsers = getAllUsers;
/**
 * Get a user API
 * @param req
 * @param res
 * @param next
 */
async function getUser(req, res, next) {
    const { id } = req.params;
    try {
        const userDetails = await usersModel_1.UserSchema.findOne({ where: { id } });
        res.status(201).json({
            status: "Success",
            message: "Successfully get all users",
            data: userDetails,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            Message: "Something went all",
        });
    }
}
exports.getUser = getUser;
/**
 * Create User API
 * @param req
 * @param res
 * @param next
 */
async function updateUser(req, res, next) {
    try {
        const { id } = req.params;
        const userDetails = await usersModel_1.UserSchema.findOne({ where: { id } });
        const { fullname, email, gender, phone, address } = req.body;
        if (userDetails) {
            const userUpdate = await userDetails.update({
                fullname: fullname || userDetails.getDataValue("fullname"),
                email: email || userDetails.getDataValue("email"),
                phone: phone || userDetails.getDataValue("phone"),
            });
            res.status(201).json({
                status: "Success",
                message: "Successfully updated a user",
                data: userUpdate,
            });
        }
        else {
            res.json({
                status: "failed",
                message: "User not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            Message: "Unable to update user",
        });
    }
}
exports.updateUser = updateUser;
async function deleteUser(req, res) {
    const { id } = req.params;
    const userDetails = await usersModel_1.UserSchema.findOne({ where: { id } });
    if (!userDetails) {
        res.json({
            status: "failed",
            message: "User not found",
        });
    }
    else {
        const deletedUser = await userDetails.destroy();
        res.status(201).json({
            status: "Success",
            message: "Successfully Deleted a user",
            data: deletedUser,
        });
    }
}
exports.deleteUser = deleteUser;
/**
 * THE LOGIN API
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function loginUser(req, res, next) {
    // const id = uuidv4();
    try {
        const validationResult = utils_1.loginUsersSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const User = (await usersModel_1.UserSchema.findOne({
            where: { email: req.body.email },
        }));
        if (!User) {
            return res.status(401).json({
                message: "User does not exist or Email is not correct",
            });
        }
        const { id } = User;
        const token = (0, utils_1.generateToken)({ id });
        const validPassword = await bcryptjs_1.default.compare(req.body.password, User.password);
        if (!validPassword) {
            return res.status(401).json({
                message: "Password is not correct",
            });
        }
        else if (req.body.email !== User.email) {
            return res.status(401).json({
                message: "Email is not correct",
            });
        }
        if (validPassword) {
            console.log(req.cookies);
            return res
                .cookie("jwt", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
                .status(200)
                .json({
                message: "Successfully logged in",
                token,
                User,
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "failed to login",
            route: "/login",
        });
    }
}
exports.loginUser = loginUser;
async function logoutUser(req, res, next) {
    return res
        .clearCookie("jwt")
        .status(200)
        .json({ message: "Successfully logged out 😏 🍀" });
}
exports.logoutUser = logoutUser;
