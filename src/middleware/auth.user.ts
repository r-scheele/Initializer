import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
import sessionModel from "../models/session.model";
import { reIssueAccessToken } from "../services/session.service";
import { verifyJWT } from "../utils/jwt.utils";

export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const accessToken = get(req, "headers.authorization", "").replace(
		/^Bearer\s/,
		""
	);

	const refreshToken = get(req, "headers.x-refresh");

	if (!accessToken) return next();

	const { isValid, decoded, expired } = await verifyJWT(accessToken);

	if (isValid) {
		req.user = decoded;
		const session = await sessionModel.findById(req.user.session);
		if (session.isValid) return next();
		else {
			return res.json({ msg: "Please login to access resources" });
		}
	}
	if (expired && refreshToken) {
		const newAccessToken: any = await reIssueAccessToken(refreshToken);
		if (newAccessToken) res.setHeader("x-access-token", newAccessToken);

		const result = await verifyJWT(newAccessToken);
		req.user = result.decoded;
		next();
	}
};
