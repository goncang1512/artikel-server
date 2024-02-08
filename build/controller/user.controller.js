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
exports.deleteUser = exports.updateUser = exports.createAccount = exports.getDetailUser = exports.getUserAll = void 0;
const user_services_1 = require("../services/user.services");
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_models_1 = __importDefault(require("../models/users.models"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const getUserAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_services_1.getUser)();
        res.status(200).json({ status: true, statusCode: 200, message: 'Success get all users', result });
        next();
    }
    catch (error) {
        res.status(500).json({ status: false, statusCode: 500, message: 'Failed get user' });
    }
});
exports.getUserAll = getUserAll;
const getDetailUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield (0, user_services_1.getUserById)(userId);
        res.status(200).json({ status: true, statusCode: 200, message: 'Success get user', result });
        next();
    }
    catch (error) {
        console.log(error);
    }
});
exports.getDetailUser = getDetailUser;
const createAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const fileCloud = req.cloudFile;
        const urlProfil = fileCloud.secure_url;
        const fileName = fileCloud.public_id;
        const user_id = (0, uuid_1.v4)();
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const data = {
            user_id,
            username,
            email,
            password: hashedPassword,
            refreshToken: null,
            imgProfil: {
                public_id: fileName,
                urlProfil
            }
        };
        const result = yield (0, user_services_1.postAccount)(data);
        res.status(201).json({ status: true, statusCode: 201, message: 'Success create user', result });
        next();
    }
    catch (error) {
        console.log(error);
    }
});
exports.createAccount = createAccount;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, email, password } = req.body;
    const user = yield users_models_1.default.findById(id);
    const fileCloud = req.cloudFile;
    const fileName = fileCloud.public_id;
    const urlProfil = fileCloud.secure_url;
    let newPassword;
    if (password === undefined || password === null || password === '') {
        newPassword = user === null || user === void 0 ? void 0 : user.password;
    }
    else {
        const salt = yield bcryptjs_1.default.genSalt(10);
        newPassword = yield bcryptjs_1.default.hash(password, salt);
    }
    try {
        const result = yield (0, user_services_1.patchAccount)(id, {
            username,
            email,
            password: newPassword,
            imgProfil: {
                public_id: fileName,
                urlProfil
            }
        });
        res.status(201).json({ status: true, statusCode: 201, message: 'Success updated user', result });
        next();
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const _id = req.params.id;
    try {
        const user = yield (0, user_services_1.getUserImg)(_id);
        const imgId = (_a = user === null || user === void 0 ? void 0 : user.imgProfil) === null || _a === void 0 ? void 0 : _a.public_id;
        yield cloudinary_1.default.uploader.destroy(imgId);
        const result = yield (0, user_services_1.deleteAccount)(_id);
        res.status(200).json({ status: true, statusCode: 200, message: 'Success delete user', result });
        next();
    }
    catch (error) {
        res.status(500).json({ status: false, statusCode: 500, message: 'Failed delete user', Error: error });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map