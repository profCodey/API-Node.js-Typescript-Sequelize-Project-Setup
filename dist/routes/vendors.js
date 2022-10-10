"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vendorsController_1 = require("../controller/vendorsController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
/* GET users listing. */
router.get("/", function (req, res, next) {
    res.status(200).json({
        status: "Success",
        Message: "Successfully created a route",
    });
});
router.get("/api/vendors/:id", vendorsController_1.getVendor);
router.post("/api/vendors", vendorsController_1.createVendor);
router.get("/api/vendors", vendorsController_1.getAllVendors);
router.put("/api/vendors/:id", vendorsController_1.updateVendor);
router.delete("/api/vendors/:id", auth_1.auth, vendorsController_1.deleteVendor);
router.post("/api/login", vendorsController_1.loginVendor);
exports.default = router;
