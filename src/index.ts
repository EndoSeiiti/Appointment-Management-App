import * as express from "express";
import type { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
