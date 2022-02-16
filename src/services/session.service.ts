import config from "config";
import { JwtPayload } from "jsonwebtoken";
import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import sessionModel, { Session } from "../models/session.model";
import { verifyJWT, signJWT } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export const createSession = async (userId: string, userAgent: string) => {
	const session = await sessionModel.create({ user: userId, userAgent });

	return session.toJSON();
};

export const getSessions = async (query: FilterQuery<Session>) => {
	const sessions: Array<Session> = await sessionModel.find(query);

	return sessions;
};

export const updateSession = async (
	query: FilterQuery<Session>,
	update: UpdateQuery<Session>
) => {
	return sessionModel.updateOne(query, update);
};

export const updateSessions = async (
	query: FilterQuery<Session>,
	update: UpdateQuery<Session>
) => {
	return sessionModel.updateMany(query, update);
};

export const reIssueAccessToken = async (refreshToken: string) => {
	const { decoded }: JwtPayload = await verifyJWT(refreshToken);
	let newAccessToken = "";

	if (!get(decoded, "_id")) return newAccessToken;

	const session = await sessionModel.findById(decoded.session);
	if (!session.isValid) return newAccessToken;

	const user = await findUser({ _id: session.user });
	if (!user) return newAccessToken;

	return (newAccessToken = await signJWT(
		{
			...user,
			session: session._id,
		},
		{ expiresIn: config.get("accessTokenTtl") } // expires in 15m
	));
};
