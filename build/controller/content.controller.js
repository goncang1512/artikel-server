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
exports.getContentQuery = exports.deleteContent = exports.updateContent = exports.getContentUser = exports.uplaodContent = void 0;
const content_services_1 = require("../services/content.services");
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
const uplaodContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const { id } = req.params;
    const content_id = (0, uuid_1.v4)();
    const filename = req.filename;
    const posterUrl = `${req.protocol}://${req.get('host')}/public/poster/${filename}`;
    try {
        const result = yield (0, content_services_1.postContent)({
            content_id,
            title,
            description,
            imgPoster: filename,
            posterUrl,
            user_id: id,
            user: id
        });
        res.status(201).json({ status: true, statusCode: 201, message: 'Success created content', result });
        next();
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ status: false, statusCode: 400, message: 'Filed created content' });
    }
});
exports.uplaodContent = uplaodContent;
const getContentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, content_services_1.getContent)();
        res.status(200).json({ status: true, statusCode: 200, message: 'Success get content', result });
        next();
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ status: false, statusCode: 404, message: 'Failed get content' });
    }
});
exports.getContentUser = getContentUser;
const updateContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const { id } = req.params;
        const filename = req.filename;
        const posterUrl = `${req.protocol}://${req.get('host')}/public/poster/${filename}`;
        const result = yield (0, content_services_1.patchContent)(id, {
            title,
            description,
            imgPoster: filename,
            posterUrl
        });
        res.status(200).json({ status: true, statusCode: 200, message: 'Success update content', result });
        next();
    }
    catch (error) {
        res.status(404).json({ status: false, statusCode: 404, message: 'Failed update content' });
    }
});
exports.updateContent = updateContent;
const deleteContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield (0, content_services_1.findContent)(req.params.id);
        const filepath = `./public/poster/${content.imgPoster}`;
        if (fs_1.default.existsSync(filepath)) {
            fs_1.default.unlinkSync(filepath);
        }
        const result = yield (0, content_services_1.destroyContent)(req.params.id);
        res.status(204).json({ status: true, statusCode: 204, message: 'Success deleted content', result });
        next();
    }
    catch (error) {
        res.status(404).json({ status: false, statusCode: 404, message: 'Failed deleted content' });
    }
});
exports.deleteContent = deleteContent;
const getContentQuery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content } = req.query;
        const result = yield (0, content_services_1.searchContent)(content);
        res.status(200).json({ status: true, statusCode: 200, message: 'Success get content', result });
        next();
    }
    catch (error) {
        res.status(400).json({ status: false, statusCode: 400, message: 'failed get content' });
    }
});
exports.getContentQuery = getContentQuery;
//# sourceMappingURL=content.controller.js.map