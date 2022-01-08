import express from "express";
import config from "config";

import connectDB from "./utils/connectDB";
import logger from "./utils/logger";
import routes from "./routes";

const port = config.get<number>("port");
const app = express();

app.listen(port, async () => {
	logger.info(`App is running on port http://localhost:${port}`);

	await connectDB();
	routes(app);
});
