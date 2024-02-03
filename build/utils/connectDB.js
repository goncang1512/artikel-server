"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("./logger");
const environtment_1 = __importDefault(require("../config/environtment"));
mongoose_1.default
    .connect(`${environtment_1.default.dbOnline}`, {
    dbName: `${environtment_1.default.name}`
})
    .then(() => {
    logger_1.logger.info('Success connect to mongodb');
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=connectDB.js.map