import { Express, Request, Response } from "express";
import {
	createUserSessionHandler,
	deleteUserSessionHandler,
	deleteUserSessionsHandler,
	getUserSessionsHandler,
} from "../controllers/session.controller";
import { createUserHandler } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth.user";
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
	app.get("/api/sessions", authenticate, getUserSessionsHandler);
	app.delete("/api/session", authenticate, deleteUserSessionHandler);
	app.delete("/api/sessions", authenticate, deleteUserSessionsHandler);
};

export default routes;
