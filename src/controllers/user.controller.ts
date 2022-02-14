import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../services/user.service";
import { createUserInput } from "../schemas/user.schema";
import { omit } from "lodash";
import UserModel from "../models/users.model";

export const createUserHandler = async (
	req: Request<{}, {}, createUserInput["body"]>,
	res: Response
) => {
	try {
		let { email } = req.body;
		const userExists = await UserModel.findOne({ email });
		if (userExists) return res.json({ msg: "User already exist" });

		const user = await createUser(req?.body);

		const userOut = omit(user?.toJSON(), ["password", "__v"]);
		return res.json(userOut);
	} catch (err: any) {
		logger.error(err);
		res.status(409).send(err.message);
	}
};
