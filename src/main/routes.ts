import { Express, Request, Response } from "express";
import {
	loginHandler,
	logoutHandler,
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
	app.post("/api/login", validate(createSessionSchema), loginHandler);
	app.get("/api/sessions", authenticate, getUserSessionsHandler);
	app.delete("/api/logout", authenticate, logoutHandler);
	app.delete("/api/logout/all", authenticate, deleteUserSessionsHandler);
};

export default routes;
