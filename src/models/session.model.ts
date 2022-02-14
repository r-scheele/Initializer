import mongoose from "mongoose";

import { User } from "./users.model";

export interface Session extends mongoose.Document {
	user: User["_id"];
	isValid: boolean;
	userAgent: string;
	createdAt: Date;
	updatedAt: Date;
}
const sessionSchema = new mongoose.Schema<Session>(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		isValid: {
			type: Boolean,
			default: true,
		},
		userAgent: String,
	},
	{
		timestamps: true,
	}
);

const sessionModel =
	mongoose.models.Session ||
	mongoose.model<Session>("Session", sessionSchema);
export default sessionModel;
