import { Request, Response } from "express";
import logger from "../utils/logger";
import { createUser } from "../services/user.service";
import { createUserInput } from "../schemas/user.schema";

export async function createUserHandler(
  req: Request<{}, {}, createUserInput["body"]>,
  res: Response
) {
  try {
    const user = createUser(req.body);
  } catch (err: any) {
    logger.error(err);
    res.status(409).send(err.message);
  }
}
