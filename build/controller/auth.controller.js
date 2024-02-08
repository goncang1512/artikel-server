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
exports.logoutAuth = exports.refreshToken = exports.loginAuth = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = require("../utils/logger");
const users_models_1 = __importDefault(require("../models/users.models"));
const validation_1 = require("../middleware/validation");
const loginAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, validation_1.loginValidation)(req.body);
    try {
        const user = yield users_models_1.default.find({ email: result.email });
        if (!user) {
            return res.status(422).json({ status: false, statusCode: 422, message: 'User tidak di temukan' });
        }
        const match = yield bcryptjs_1.default.compare(result.password, user[0].password);
        if (!match)
            return res.status(400).json({ message: 'Password Salah' });
        const _id = user[0]._id;
        const user_id = user[0].user_id;
        const username = user[0].username;
        const email = user[0].email;
        const accessToken = jsonwebtoken_1.default.sign({ _id, user_id, username, email }, `${process.env.ACCESS_TOKEN_SECRET}`, {
            expiresIn: '20s'
        });
        const refreshToken = jsonwebtoken_1.default.sign({ _id, user_id, username, email }, `${process.env.REFRESH_TOKEN_SECRET}`, {
            expiresIn: '30d'
        });
        yield users_models_1.default.findOneAndUpdate({ _id }, { $set: { refreshToken } });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: true
        });
        res.status(200).json({ status: true, statusCode: 200, message: 'Success login', accessToken });
        next();
    }
    catch (error) {
        let pesan;
        if (result.from === 'Joi') {
            pesan = result.message;
        }
        else {
            pesan = 'User tidak di temukan';
        }
        logger_1.logger.error(`Gagal login = ${pesan}`);
        res.status(400).json({ status: false, statusCode: 400, message: pesan });
    }
});
exports.loginAuth = loginAuth;
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken)
            return res.sendStatus(401);
        const user = yield users_models_1.default.find({ refreshToken });
        if (!user[0])
            return res.sendStatus(403);
        jsonwebtoken_1.default.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`, (err, _decoded) => {
            if (err)
                return res.sendStatus(403);
            const _id = user[0]._id;
            const user_id = user[0].user_id;
            const username = user[0].username;
            const email = user[0].email;
            const imgProfil = user[0].imgProfil;
            const createdAt = user[0].createdAt;
            const accessToken = jsonwebtoken_1.default.sign({ _id, user_id, username, email, imgProfil, createdAt }, `${process.env.ACCESS_TOKEN_SECRET}`, {
                expiresIn: '15s'
            });
            res.status(200).json({ status: true, statusCode: 200, message: 'Berhasil refresh token', accessToken });
            next();
        });
    }
    catch (error) {
        logger_1.logger.info('Gagal refresh token');
        res.status(403).json({ status: false, statusCode: 403, message: 'Tidak authentication', Error: error });
    }
});
exports.refreshToken = refreshToken;
const logoutAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken)
            return res.sendStatus(204);
        const user = yield users_models_1.default.find({ refreshToken });
        if (!user[0])
            return res.sendStatus(403);
        const _id = user[0]._id;
        yield users_models_1.default.findOneAndUpdate({ _id }, { $set: { refreshToken: null } });
        res.clearCookie('refreshToken');
        res.status(200).json({ status: true, statusCode: 200, message: 'Berhasil logout' });
        next();
    }
    catch (error) {
        logger_1.logger.info('Gagal logout');
        res.status(500).json({ status: false, statusCode: 500, message: 'Gagal logout' });
    }
});
exports.logoutAuth = logoutAuth;
//# sourceMappingURL=auth.controller.js.map