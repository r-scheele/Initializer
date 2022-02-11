import { DocumentDefinition } from "mongoose";
import UserModel, { User } from "../models/users.model";

// any more field added to the User must be omiited here, in the createUser
export async function createUser(
  input: DocumentDefinition<
    Omit<User, "createdAt" | "updatedAt" | "comparePassword">
  >
) {
  try {
    return await UserModel.create(input);
  } catch (e: any) {
    throw new Error(e);
  }
}
