import express, { Request, Response, NextFunction } from "express";
import {
  createVendor,
  getAllVendors,
  getVendor,
  deleteVendor,
  loginVendor,
  updateVendor,
} from "../controller/vendorsController";
import { auth } from "../middleware/auth";
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.status(200).json({
    status: "Success",
    Message: "Successfully created a route",
  });
});

router.get("/api/vendors/:id", getVendor);
router.post("/api/vendors", createVendor);
router.get("/api/vendors", getAllVendors);
router.put("/api/vendors/:id", updateVendor);
router.delete("/api/vendors/:id", auth, deleteVendor);
router.post("/api/login", loginVendor);

export default router;
