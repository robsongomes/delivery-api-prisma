import "express-async-errors"; //precisa ser carregado antes do express '-'
import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes";

const port = 3000;
const app = express();

app.use(express.json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      response.status(400);
      response.json({
        message: err.message,
      });
    } else {
      response.status(500);
      response.json({
        message: "Internal server error",
      });
    }
    next(err);
  }
);

app.listen(port, () => {
  console.log(`Running on http://localhost/${port}`);
});
