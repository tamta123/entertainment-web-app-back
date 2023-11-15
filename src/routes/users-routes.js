import express from "express";
import {
  addUSer,
  emptyTable,
  getAllUsers,
  login,
} from "../controllers/users-controller.js";

const usersRouter = express.Router();
usersRouter.get("/users", getAllUsers);
usersRouter.post("/register", addUSer);
usersRouter.post("/login", login);
usersRouter.delete("/users/empty", emptyTable);

export default usersRouter;
