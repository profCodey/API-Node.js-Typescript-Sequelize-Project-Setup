import express, { Request, Response, NextFunction } from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
} from "../controller/usersController";
import { auth } from "../middleware/auth";
const router = express.Router();

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
router.post("/api/login", loginUser);
router.get("/api/logout", auth, logoutUser);

router.route("/api/users").get(getAllUsers).post(createUser);
router.route("/api/users:id").get(getUser).put(updateUser).delete(deleteUser);

export default router;
