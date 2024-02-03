"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const logger_1 = require("../utils/logger");
const auth_controller_1 = require("../controller/auth.controller");
exports.AuthRouter = (0, express_1.Router)();
exports.AuthRouter.post('/login', auth_controller_1.loginAuth, () => {
    logger_1.logger.info('Success login account');
});
exports.AuthRouter.get('/token', auth_controller_1.refreshToken, () => {
    logger_1.logger.info('Success refresh token ');
});
exports.AuthRouter.delete('/logout', auth_controller_1.logoutAuth, () => {
    logger_1.logger.info('Success logut account ');
});
//# sourceMappingURL=auth.routes.js.map