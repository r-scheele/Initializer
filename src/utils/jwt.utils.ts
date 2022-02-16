import jwt from "jsonwebtoken";
import config from "config";
const privateKey = config.get<string>("privateKey"),
	publicKey = config.get<string>("publicKey");

export const signJWT = async (payload: Object, options?: jwt.SignOptions) =>
	await jwt.sign(payload, privateKey, {
		...(options && options),
		algorithm: "RS256",
	});

export const verifyJWT = async (token: string | undefined) => {
	try {
		const decoded = await jwt.verify(token, publicKey);
		return {
			isValid: true,
			expired: false,
			decoded,
		};
	} catch (err: any) {
		return {
			isValid: false,
			expired: err.message == "jwt expired",
			decoded: null,
		};
	}
};
