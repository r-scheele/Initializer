import { readFileSync } from "fs";
import { dirname, join } from "path";

export default {
	port: 1337,
	dbUri: "mongodb://localhost:27017/reactors",
	saltRound: 10,
	accessTokenTtl: "60m",
	refreshTokenTtl: "1y",
	privateKey: readFileSync(join(__dirname, "jwtRS256.key")),
	publicKey: readFileSync(join(__dirname, "jwtRS256.key.pub")),
};
