import express from "express";
import type { Request, Response } from "express";
import reservationsRouter from "./routes/reservations";
import usersRouter from "./routes/users";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome");
});

app.use("/api/reservations", reservationsRouter);
app.use("/api/users",usersRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
