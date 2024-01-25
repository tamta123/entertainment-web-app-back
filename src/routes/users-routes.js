import express from "express";
import {
  addUser,
  getAllUsers,
  login,
  verifyEmail,
} from "../controllers/users-controller.js";
import saveUser from "../middlewares/user-middleware.js";

const usersRouter = express.Router();
usersRouter.get("/users", getAllUsers);
usersRouter.post("/register", saveUser, addUser);
usersRouter.post("/login", login);
usersRouter.get("/verify-email/:id/:token", verifyEmail);
// usersRouter.delete("/users/empty", emptyTable);

export default usersRouter;
