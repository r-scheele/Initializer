import {DocumentDefinition} from "mongoose"
import UserModel, { User } from "../models/users.model";


export async function createUser(input: DocumentDefinition<User>) {
    try {
        return await UserModel.create(input)
    } catch (e: any) {
        throw new Error(e)
    }
}