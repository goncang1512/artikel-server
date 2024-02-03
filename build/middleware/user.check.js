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
exports.chekcUpdateUser = exports.checkUser = void 0;
const users_models_1 = __importDefault(require("../models/users.models"));
const checkUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password, confPassword } = req.body;
    const user = yield users_models_1.default.findOne({
        $or: [{ username }, { email }]
    });
    if (user) {
        return res.status(422).json({ status: false, statusCode: 422, message: 'Email atau Username sudah terdaftar' });
    }
    if (password !== confPassword) {
        return res.status(422).json({ status: false, statusCode: 422, message: 'password dan confirm password tidak sama' });
    }
    next();
});
exports.checkUser = checkUser;
const chekcUpdateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, confPassword } = req.body;
    const { id } = req.params;
    const user = yield users_models_1.default.findOne({
        $or: [{ username }, { email }]
    });
    if (user && String(user._id) !== id) {
        return res.status(422).json({ status: false, statusCode: 422, message: 'username atau email sudah terdaftar' });
    }
    if (password !== confPassword) {
        return res.status(422).json({ status: false, statusCode: 422, message: 'password dan confirm password tidak sama' });
    }
    next();
});
exports.chekcUpdateUser = chekcUpdateUser;
//# sourceMappingURL=user.check.js.map