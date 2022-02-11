import { Express, Request, Response } from "express";
import { createUserHandler } from "./controllers/user.controller";
import validate from "./middlewares/validate.resource";
import { createUserSchema } from "./schemas/user.schema";

const routes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => res.sendStatus(200));

  app.post("/api/users", validate(createUserSchema), createUserHandler);
};

export default routes;
