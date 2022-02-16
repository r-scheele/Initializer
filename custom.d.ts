import { User } from "./src/models/users.model";

declare global {
	namespace Express {
		export interface Request {
			user: User["_id"];
		}
	}
}
