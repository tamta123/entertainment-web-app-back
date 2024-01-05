import express from "express";
import {
  addUser,
  getAllUsers,
  login,
} from "../controllers/users-controller.js";
import userMiddleware from "../middlewares/user-middleware.js";

const usersRouter = express.Router();
usersRouter.get("/users", userMiddleware, getAllUsers);
usersRouter.post("/register", addUser);
usersRouter.post("/login", userMiddleware, login);
// usersRouter.delete("/users/empty", emptyTable);

export default usersRouter;
