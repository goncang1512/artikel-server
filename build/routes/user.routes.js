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
const logger_1 = require("../utils/logger");
const user_controller_1 = require("../controller/user.controller");
const validation_1 = require("../middleware/validation");
const user_check_1 = require("../middleware/user.check");
const express_1 = require("express");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const uploadMulter_1 = require("../middleware/uploadMulter");
exports.UserRouter = (0, express_1.Router)();
exports.UserRouter.get('/users', user_controller_1.getUserAll, () => {
    logger_1.logger.info('Success get user data');
});
exports.UserRouter.get('/users/:userId', user_controller_1.getDetailUser, () => {
    logger_1.logger.info('Success get user data');
});
exports.UserRouter.post('/users', validation_1.createUserValidation, user_check_1.checkUser, uploadMulter_1.uploadFile, user_controller_1.createAccount, () => {
    logger_1.logger.info('Success create user data');
});
exports.UserRouter.patch('/users/:id', validation_1.updateValidateUser, user_check_1.chekcUpdateUser, uploadMulter_1.updateUploadFile, user_controller_1.updateUser, () => {
    logger_1.logger.info('Success updated user data');
});
exports.UserRouter.delete('/users/:id', user_controller_1.deleteUser, () => {
    logger_1.logger.info('Success deleted user data');
});
exports.UserRouter.post('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const profil = req.body.profil;
    try {
        const result = yield cloudinary_1.default.uploader.upload(profil, { folder: 'profil' });
        console.log(result);
        logger_1.logger.info('Success upload img');
        res.status(200).json({ messgae: 'Success', data: result });
    }
    catch (error) {
        res.status(500).json({ messgae: 'Error upload', Error: error });
    }
}));
//# sourceMappingURL=user.routes.js.map