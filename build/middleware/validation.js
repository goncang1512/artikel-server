"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.updateValidateUser = exports.createUserValidation = exports.updateContentValidation = exports.createContentValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const logger_1 = require("../utils/logger");
const createContentValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required().max(50).empty(''),
        description: joi_1.default.string().required().max(50).empty('')
    });
    const { error } = schema.validate(req.body);
    if (error) {
        let message = '';
        switch (error.details[0].type) {
            case 'any.required':
                message = 'Semua data harus di isi';
                break;
            case 'string.max':
                message = 'Title tidak boleh lebih 50 char';
                break;
            case 'number.base':
                message = 'Umur harus menggunakan angka';
                break;
        }
        logger_1.logger.error(`ERR: content - create = ${error.details[0].message}`);
        return res.status(422).json({
            status: false,
            statusCode: 422,
            result: {},
            message
        });
    }
    next();
};
exports.createContentValidation = createContentValidation;
const updateContentValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        title: joi_1.default.string().required().max(50).empty(''),
        description: joi_1.default.string().required().max(50).empty(''),
        imgPoster: joi_1.default.allow()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        let message = '';
        switch (error.details[0].type) {
            case 'any.required':
                message = 'Semua data harus di isi';
                break;
            case 'string.max':
                message = 'Title tidak boleh lebih 50 char';
                break;
            case 'number.base':
                message = 'Umur harus menggunakan angka';
                break;
        }
        logger_1.logger.error(`ERR: content - create = ${error.details[0].message}`);
        return res.status(422).json({
            status: false,
            statusCode: 422,
            result: {},
            message
        });
    }
    next();
};
exports.updateContentValidation = updateContentValidation;
const createUserValidation = (req, res, next) => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().max(15).required().empty(''),
        email: joi_1.default.string().required().empty(''),
        password: joi_1.default.string().required().empty(''),
        confPassword: joi_1.default.string().required().empty(''),
        imgProfil: joi_1.default.allow()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        let message = '';
        switch (error.details[0].type) {
            case 'any.required':
                message = 'Semua data harus di isi';
                break;
            case 'string.max':
                message = 'Title tidak boleh lebih 50 char';
                break;
        }
        logger_1.logger.error(`ERR: user - create = ${error.details[0].message}`);
        return res.status(422).json({
            status: false,
            statusCode: 422,
            result: {},
            message
        });
    }
    next();
};
exports.createUserValidation = createUserValidation;
const updateValidateUser = (req, res, next) => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().max(15).required().empty(''),
        email: joi_1.default.string().required().empty(''),
        password: joi_1.default.string().allow().empty(''),
        confPassword: joi_1.default.string().allow().empty(''),
        imgProfil: joi_1.default.allow()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        let message = '';
        switch (error.details[0].type) {
            case 'any.required':
                message = 'Semua data harus di isi';
                break;
            case 'string.max':
                message = 'Username tidak boleh lebih 50 char';
                break;
        }
        logger_1.logger.error(`ERR: user - create = ${error.details[0].message}`);
        return res.status(422).json({
            status: false,
            statusCode: 422,
            result: {},
            message
        });
    }
    next();
};
exports.updateValidateUser = updateValidateUser;
const loginValidation = (payload) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required()
    });
    const { error, value } = schema.validate(payload);
    if (error) {
        let message = '';
        switch (error === null || error === void 0 ? void 0 : error.details[0].type) {
            case 'string.empty':
                message = 'Semua data harus di isi';
                break;
            case 'string.base':
                message = 'Harus bernilai string';
                break;
            case 'string.email':
                message = 'Anda harus memasukkan email';
                break;
        }
        return { message, from: 'Joi' };
    }
    else {
        return value;
    }
};
exports.loginValidation = loginValidation;
//# sourceMappingURL=validation.js.map