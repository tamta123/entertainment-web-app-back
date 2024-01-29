import express from "express";
import {
  addUser,
  bookmarkMovie,
  getAllUsers,
  login,
  verifyEmail,
} from "../controllers/users-controller.js";
import saveUser from "../middlewares/user-middleware.js";

const usersRouter = express.Router();
usersRouter.get("/users", getAllUsers);
usersRouter.post("/register", saveUser, addUser);
usersRouter.get("/users/verify-email/:id/:token", verifyEmail);
usersRouter.post("/login", login);
usersRouter.post("/bookmark", bookmarkMovie);

// usersRouter.delete("/users/empty", emptyTable);

export default usersRouter;
