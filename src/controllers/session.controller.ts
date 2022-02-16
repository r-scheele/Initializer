import { NextFunction, Request, Response } from "express";
import {
	createSession,
	getSessions,
	updateSession,
	updateSessions,
} from "../services/session.service";
import { validatePassword } from "../services/user.service";
import { signJWT } from "../utils/jwt.utils";
import config from "config";
export const loginHandler = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
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
	// authenticate(req, res, next);
	return res.json({
		accessToken,
		refreshToken,
	});
};

export const getUserSessionsHandler = async (req: Request, res: Response) => {
	const sessions = await getSessions({
		user: req.user._id,
		isValid: true,
	});
	if (sessions) return res.json(sessions);
};

export const logoutHandler = async (req: Request, res: Response) => {
	await updateSession({ _id: req.user.session }, { isValid: false });
	return res.json({
		accessToken: null,
		refreshToken: null,
	});
};

export const deleteUserSessionsHandler = async (
	req: Request,
	res: Response
) => {
	await updateSessions(
		{
			user: req.user._id,
			_id: {
				$ne: req.user.session,
			},
		},
		{ isValid: false }
	);
	return res.json({
		accessToken: null,
		refreshToken: null,
	});
};
