"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const vendorsModel_1 = require("../model/vendorsModel");
async function auth(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        const cookie = req.cookies.token;
        if (!authorization && !cookie) {
            // return res.redirect("/author/login");
            return res.status(401).json({
                Error: "Kindly sign in as a user",
            });
        }
        const token = authorization?.slice(7, authorization.length);
        // (authorization?.slice(7, authorization.length) as string) || cookie;
        let verified = jsonwebtoken_1.default.verify(token, secret);
        if (!verified) {
            return res.status(401).json({
                Error: "User not verified, you cant access this route",
            });
        }
        const { vendors } = verified;
        const { id } = vendors;
        console.log(id);
        const user = await vendorsModel_1.VendorSchema.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({
                Error: "User not verified",
            });
        }
        req.user = verified;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(403).json({
            Error: "User not logged in",
        });
    }
}
exports.auth = auth;
