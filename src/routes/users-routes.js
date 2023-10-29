import express from "express";
import { addUSer, getAllUsers } from "../controllers/users-controller.js";

const usersRouter = express.Router();
usersRouter.get("/users", getAllUsers);
usersRouter.post("/newUser", addUSer);

export default usersRouter;
