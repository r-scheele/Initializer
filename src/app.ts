import express from "express";
import config from "config";

import connectDB from "./utils/connectDB";
import logger from "./utils/logger";
import routes from "./main/routes";
import { authenticate } from "./middleware/auth.user";

const port = config.get<number>("port");
const app = express();
app.use(express.json());
app.use(authenticate);
app.listen(port, async () => {
	logger.info(`http://localhost:${port}`);

	await connectDB();
	routes(app);
});
