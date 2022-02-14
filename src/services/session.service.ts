import sessionModel from "../models/session.model";

export const createSession = async (userId: string, userAgent: string) => {
	const session = await sessionModel.create({ user: userId, userAgent });

	return session.toJSON();
};
