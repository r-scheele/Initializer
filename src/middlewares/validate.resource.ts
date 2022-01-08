import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate =
	(schema: AnyZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});
		} catch (err: any) {
			return res.status(err.errors);
		}
	};

export default validate;
