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
exports.searchContent = exports.destroyContent = exports.findContent = exports.patchContent = exports.getContent = exports.postContent = void 0;
const content_models_1 = __importDefault(require("../models/content.models"));
const postContent = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield content_models_1.default.create(payload);
    }
    catch (error) {
        return error;
    }
});
exports.postContent = postContent;
const getContent = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield content_models_1.default.find().populate('user', 'user_id username email imgProfil profilUrl');
});
exports.getContent = getContent;
const patchContent = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield content_models_1.default.findOneAndUpdate({ _id: id }, {
        $set: payload
    });
});
exports.patchContent = patchContent;
const findContent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield content_models_1.default.findOne({ _id: id }).lean();
    return result;
});
exports.findContent = findContent;
const destroyContent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield content_models_1.default.findByIdAndDelete({ _id: id });
});
exports.destroyContent = destroyContent;
const searchContent = (title) => __awaiter(void 0, void 0, void 0, function* () {
    return yield content_models_1.default.find({ title: { $regex: title } }).populate('user', 'user_id username email imgProfil profilUrl createdAt');
});
exports.searchContent = searchContent;
//# sourceMappingURL=content.services.js.map