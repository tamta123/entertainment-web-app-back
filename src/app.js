import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import usersRouter from "./routes/users-routes.js";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";
import moviesRouter from "./routes/movies-routes.js";
import categoriesRouter from "./routes/categories-routes.js";
import cookieParser from "cookie-parser";

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
  app.use(cookieParser()); // Make sure to use cookie-parser middleware
  app.use(
    cors({
      credentials: true, // Allow credentials (cookies, authorization headers)
    })
  );
  app.use("/api", usersRouter, moviesRouter, categoriesRouter);
  app.use("/thumbnails", express.static("public/thumbnails"));
  app.use("/", ...swaggerMiddleware);
  app.listen(process.env.PORT || 3000);
}

init();
// axios.get("facebook/user", {
//   headers: {
//     Authorization: `barrer ${token}`,
//   },
// });
//ამას ვწერთ ფრონტში
// req-ს ასევე მოყვება ჰედერი, რომლისგანაც ეგვიძლია ამოვიღოთ ავტორიზაცია, რაც ფრონტიდან იქნება გამოგზავნილი
