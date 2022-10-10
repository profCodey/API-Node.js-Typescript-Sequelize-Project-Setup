"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// FRONT END PAGES (Dashboard)
// Profile
// Messages
// Delete Account
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Template Route
router.get("/", getHomePage);
router.get("/login", getLoginPage);
router.get("/register", getRegisterPage);
router.get("/dashboard", auth_1.auth, getDashboardPage);
router.get("/add-note", getAddNotePage);
router.get("/edit-note", getEditNotePage);
router.get("/delete-note", getDeleteNotePage);
exports.default = router;
