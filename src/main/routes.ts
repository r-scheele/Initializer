import { Express, Request, Response } from "express";
import { createUserSessionHandler } from "../controllers/session.controller";
import { createUserHandler } from "../controllers/user.controller";
import validate from "../middleware/validate.resource";
import { createSessionSchema } from "../schemas/session.schema";
import { createUserSchema } from "../schemas/user.schema";

const routes = (app: Express) => {
	app.get("/", (req: Request, res: Response) =>
		res.status(200).send("API running")
	);

	app.post("/api/users", validate(createUserSchema), createUserHandler);
	app.post(
		"/api/sessions",
		validate(createSessionSchema),
		createUserSessionHandler
	);
};

export default routes;
