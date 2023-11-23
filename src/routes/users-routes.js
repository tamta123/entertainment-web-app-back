import express from "express";
import { addUSer, getAllUsers } from "../controllers/users-controller.js";
import userMiddleware from "../middlewares/user-middleware.js";

const usersRouter = express.Router();
usersRouter.get("/users", getAllUsers);
usersRouter.post("/register", addUSer);
// usersRouter.post("/login", login);
// usersRouter.delete("/users/empty", emptyTable);

export default usersRouter;
