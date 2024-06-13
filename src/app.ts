import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandlers from "./app/middlewares/globalErrorHandlers";
import notFound from "./app/middlewares/notFound";
const app: Application = express();

app.use([express.json(), express.urlencoded({ extended: true }), cors()]);

app.use("/api", router);
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcome From Car Wash Booking System!",
  });
});
app.use([globalErrorHandlers, notFound]);
export default app;
