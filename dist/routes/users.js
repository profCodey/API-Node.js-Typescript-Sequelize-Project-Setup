"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = require("../controller/usersController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
/* GET users listing. */
router.get("/", function (req, res, next) {
    // res.send("respond with a resource");
    res.status(200).json({
        status: "Success",
        Message: "Successfully created a route",
    });
});
// router.get("/users/:id", getUser);
// router.get("/users", getAllUsers);
// router.post("/users", createUser);
// router.put("/users/:id", updateUser);
// router.delete("/users/:id", deleteUser);
router.post("/api/login", usersController_1.loginUser);
router.get("/api/logout", auth_1.auth, usersController_1.logoutUser);
router.route("/api/users").get(usersController_1.getAllUsers).post(usersController_1.createUser);
router.route("/api/users:id").get(usersController_1.getUser).put(usersController_1.updateUser).delete(usersController_1.deleteUser);
exports.default = router;
