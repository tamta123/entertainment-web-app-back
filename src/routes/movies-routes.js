import express from "express";
import { addMovie, getAllMovies } from "../controllers/movies-controller.js";

const moviesRouter = express.Router();
moviesRouter.get("/allMovies", getAllMovies);
moviesRouter.post("/addMovie", addMovie);
// usersRouter.post("/login", login);
// usersRouter.delete("/users/empty", emptyTable);

export default moviesRouter;
