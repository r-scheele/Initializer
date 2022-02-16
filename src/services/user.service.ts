import { omit } from "lodash";
import { DocumentDefinition, FilterQuery } from "mongoose";
import UserModel, { User } from "../models/users.model";
import logger from "../utils/logger";

// any more field added to the User must be omitted here, in the createUser
export const createUser = async (
	input: DocumentDefinition<
		Omit<User, "createdAt" | "updatedAt" | "comparePassword">
	>
) => {
	try {
		return await UserModel.create(input);
	} catch (err: any) {
		logger.error(err.message);
		return {
			error: err.message,
		};
	}
};

export const validatePassword = async (email: string, password: string) => {
	const user: User = await UserModel.findOne({ email });

	if (!user) return false;

	const isValid = await user.comparePassword(password);

	if (!isValid) return false;
	return omit(user.toJSON(), "password");
};

export const findUser = async (query: FilterQuery<User>) =>
	await UserModel.findOne(query).lean();
