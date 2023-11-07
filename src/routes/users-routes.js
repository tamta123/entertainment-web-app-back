import express from "express";
import {
  addUSer,
  getAllUsers,
  login,
} from "../controllers/users-controller.js";

const usersRouter = express.Router();
usersRouter.get("/users", getAllUsers);
usersRouter.post("/newUser", addUSer);
usersRouter.post("/login", login);

export default usersRouter;
