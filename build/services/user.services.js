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
exports.getUserImg = exports.deleteAccount = exports.patchAccount = exports.postAccount = exports.getUserById = exports.getUser = void 0;
const logger_1 = require("../utils/logger");
const users_models_1 = __importDefault(require("../models/users.models"));
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield users_models_1.default.find({}, 'user_id username email imgProfil profilUrl refreshToken createdAt');
    }
    catch (error) {
        logger_1.logger.info('cannot get data from db');
        return error;
    }
});
exports.getUser = getUser;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield users_models_1.default.findById(id, 'user_id username email imgProfil profilUrl refreshToken createdAt');
    }
    catch (error) {
        return error;
    }
});
exports.getUserById = getUserById;
const postAccount = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield users_models_1.default.create(data);
    }
    catch (error) {
        return error;
    }
});
exports.postAccount = postAccount;
const patchAccount = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield users_models_1.default.findOneAndUpdate({ _id: id }, {
        $set: payload
    });
});
exports.patchAccount = patchAccount;
const deleteAccount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield users_models_1.default.findOneAndDelete({ _id: id });
});
exports.deleteAccount = deleteAccount;
const getUserImg = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield users_models_1.default.findById({ _id });
});
exports.getUserImg = getUserImg;
//# sourceMappingURL=user.services.js.map