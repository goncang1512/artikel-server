"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_routes_1 = require("./routes/index.routes");
const logger_1 = require("./utils/logger");
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = require("path");
// connect db mongodb
require("./utils/connectDB");
const app = (0, express_1.default)();
const port = (_a = process.env.SERVER_PORT_LISTEN) !== null && _a !== void 0 ? _a : 5500;
dotenv_1.default.config();
// parse body request
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
// public static
app.use('/public', express_1.default.static((0, path_1.resolve)('public')));
// cors access handler
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));
// cookie parser
app.use((0, cookie_parser_1.default)());
// file upload express
app.use((0, express_fileupload_1.default)());
(0, index_routes_1.routes)(app);
app.listen(port, () => {
    logger_1.logger.info(`Server berjalan di port ${port}`);
});
//# sourceMappingURL=index.js.map