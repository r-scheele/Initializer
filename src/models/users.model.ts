import bcrypt from "bcrypt";
import mongoose from "mongoose";
import config from "config";

const saltRound = config.get<number>("saltRound");

type comparePasswordFunctionType = (
  this: User,
  userPassword: string
) => Promise<boolean>;

export type User = mongoose.Document & {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: comparePasswordFunctionType;
};

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

userSchema.pre("save", async function save(next) {
  const user = this as User;

  if (!user.isModified("password")) return next();

  let salt = await bcrypt.genSalt(saltRound);
  user.password = await bcrypt.hash(user.password, salt);
  return next();
});

const comparePassword: comparePasswordFunctionType = async function (
  userPassword: string
) {
  let user = this as User;
  const isMatch = await bcrypt.compare(userPassword, user.password);
  return isMatch;
};
userSchema.methods.comparePassword = comparePassword;

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
