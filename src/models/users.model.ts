import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import config from "config";

const saltRound = config.get<number>("saltRound");

type comparePasswordFunctionType = (
	enteredPassword: string
) => Promise<boolean>;

export interface User extends mongoose.Document {
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	comparePassword: comparePasswordFunctionType;
}

const userSchema = new mongoose.Schema<User>(
	{
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: [true, "Please provide a password"],
			min: [6, "Password too short"],
		},
	},
	{
		timestamps: true,
	}
);

userSchema.pre<User>("save", async function save(next) {
	const user = this as User;
	if (!user.isModified("password")) return next();
	let salt = await bcrypt.genSalt(saltRound);
	user.password = await bcrypt.hash(user.password, salt);
	return next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel =
	mongoose.models.User || mongoose.model<User>("User", userSchema);
export default UserModel;
