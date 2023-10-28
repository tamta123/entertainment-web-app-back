import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import usersRouter from "./routes/users-routes.js";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";

const app = express();

async function init() {
  try {
    serverStart();
  } catch (error) {
    console.log(error);
  }
}
function serverStart() {
  app.use(bodyParser.json());
  app.use(cors());
  app.use("/api", usersRouter);
  app.listen(process.env.PORT || 3000);
  app.use("/", swaggerMiddleware);
}

init();
