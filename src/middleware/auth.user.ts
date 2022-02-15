import { Request, Response, NextFunction } from "express";
import { get } from "lodash";
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
	if (!accessToken) return next();

	const { isValid, decoded, expired } = await verifyJWT(accessToken);

	if (isValid) {
		(<any>req).user = decoded;
		return next();
	}
};
