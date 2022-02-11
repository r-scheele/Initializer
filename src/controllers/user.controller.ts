import {Request, Response} from "express"
import logger from "../utils/logger"
import {createUser} from "../services/user.service"


export async function createUserHandler(req: Request, res: Response) {
    try {
       const user = createUser(req.body)

    } catch (err: any) {
        logger.error(err)
        res.status(409).send(err.message)
    }
}