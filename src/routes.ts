import { Express, Request, Response } from "express";
import {createUserHandler} from "./controllers/user.controller"

const routes = (app: Express) => {
	app.get("/", (req: Request, res: Response) => res.sendStatus(200));



	app.post("/api/users", createUserHandler)
};

export default routes;
