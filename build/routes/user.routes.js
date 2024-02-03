"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const logger_1 = require("../utils/logger");
const user_controller_1 = require("../controller/user.controller");
const validation_1 = require("../middleware/validation");
const user_check_1 = require("../middleware/user.check");
const profil_upload_1 = require("../middleware/profil.upload");
const user_services_1 = require("../services/user.services");
const content_models_1 = __importDefault(require("../models/content.models"));
exports.UserRouter = (0, express_1.Router)();
exports.UserRouter.get('/users', user_controller_1.getUserAll, () => {
    logger_1.logger.info('Success get user data');
});
exports.UserRouter.get('/users/:userId', user_controller_1.getDetailUser, () => {
    logger_1.logger.info('Success get user data');
});
exports.UserRouter.post('/users', validation_1.createUserValidation, user_check_1.checkUser, user_controller_1.createAccount, () => {
    logger_1.logger.info('Success create user data');
});
exports.UserRouter.patch('/users/:id', validation_1.updateValidateUser, user_check_1.chekcUpdateUser, profil_upload_1.updateUserImg, user_controller_1.updateUser, () => {
    logger_1.logger.info('Success updated user data');
});
exports.UserRouter.delete('/users/:id', user_controller_1.deleteUser, () => {
    logger_1.logger.info('Success deleted user data');
});
exports.UserRouter.get('/my/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_services_1.getUserImg)(req.params.id);
    const contents = yield content_models_1.default.find({ user_id: user === null || user === void 0 ? void 0 : user._id });
    res.json({ contents });
}));
//# sourceMappingURL=user.routes.js.map