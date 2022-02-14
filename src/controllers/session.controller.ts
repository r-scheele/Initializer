import { Request, Response } from "express";
import { createSession } from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJWT } from "../utils/jwt.utils";
import config from "config";

export const createUserSessionHandler = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await validatePassword(email, password);
	if (!user) return res.status(401).send("Invalid email or password");

	const session = await createSession(user._id, req.get("user-agent") || "");

	const accessToken = await signJWT(
		{
			...user,
			session: session._id,
		},
		{ expiresIn: config.get("accessTokenTtl") } // expires in 15m
	);

	const refreshToken = await signJWT(
		{
			...user,
			session: session._id,
		},
		{ expiresIn: config.get("refreshTokenTtl") } // expires in 1y
	);

	return res.json({
		accessToken,
		refreshToken,
	});
};
