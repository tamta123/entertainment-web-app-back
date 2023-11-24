import express from "express";
import {
  addCategory,
  getAllCategories,
} from "../controllers/categories-controller.js";

const categoriesRouter = express.Router();
categoriesRouter.get("/allCategories", getAllCategories);
categoriesRouter.post("/addCategory", addCategory);
// usersRouter.post("/login", login);
// usersRouter.delete("/users/empty", emptyTable);

export default categoriesRouter;
