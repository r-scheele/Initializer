import { FilterQuery } from "mongoose";
import sessionModel, { Session } from "../models/session.model";

export const createSession = async (userId: string, userAgent: string) => {
	const session = await sessionModel.create({ user: userId, userAgent });

	return session.toJSON();
};

export const getSessions = async (query: FilterQuery<Session>) => {
	const sessions: Array<Session> = await sessionModel.find(query);
	return sessions;
};
