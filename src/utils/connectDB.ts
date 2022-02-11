import mongoose from "mongoose";
import config from "config";

import logger from "./logger";

const connectDB = async () => {
	const dbUri = config.get<string>("dbUri");

	try {
		await mongoose.connect(dbUri);
		logger.info("database connected");
	} catch (err) {
		logger.error("Could not connect to database");
		process.exit(1);
	}
};

export default connectDB;
