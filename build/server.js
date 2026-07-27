"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const database_config_1 = require("./config/database.config");
const env_config_1 = require("./config/env.config");
const PORT = env_config_1.ENV_CONFIG.PORT;
const DB_URI = env_config_1.ENV_CONFIG.DB_URI;
//*connect database
(0, database_config_1.connectDatabase)(DB_URI);
//*http server
const server = http_1.default.createServer(app_1.default);
//*listen
server.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
});
