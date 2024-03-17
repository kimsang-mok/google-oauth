import express, { Request, Response } from "express";
import cors from "cors";
import router from "./routes";

const app = express();

app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello world");
});

export default app;
