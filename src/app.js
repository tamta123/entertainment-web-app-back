import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import usersRouter from "./routes/users-routes.js";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";
import moviesRouter from "./routes/movies-routes.js";
import categoriesRouter from "./routes/categories-routes.js";

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
  app.use("/api", usersRouter, moviesRouter, categoriesRouter);
  app.use("/", ...swaggerMiddleware);
  app.listen(process.env.PORT || 3000);
}

init();

// axios.get("facebook/user", {
//   headers: {
//     authrization: `barrer ${token}`,
//   },
// }); ამას ვწერთ ფრონტში
// req-ს ასევე მოყვება ჰედერი, რომლისგანაც ეგვიძლია ამოვიღოთ ავტორიზაცია, რაც ფრონტიდან იქნება გამოგზავნილი
