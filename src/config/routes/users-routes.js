import express from "express";
import { getAllUsers } from "../controllers/users-controller.js";

const usersRouter = express.Router();
usersRouter.get("/users", getAllUsers);

export default usersRouter;
