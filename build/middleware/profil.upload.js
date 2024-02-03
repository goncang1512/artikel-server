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
exports.updateUserImg = exports.uploadImgProfil = void 0;
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const user_services_1 = require("../services/user.services");
const fs_1 = __importDefault(require("fs"));
const uploadImgProfil = (req, res, next) => {
    var _a;
    if (req.files === null || !((_a = req.files) === null || _a === void 0 ? void 0 : _a.imgProfil)) {
        return res.status(400).json({ message: 'Tidak ada foto' });
    }
    const file = req.files.imgProfil;
    const fileSize = file.data.length;
    const ext = path_1.default.extname(file.name);
    const fileName = `${(0, uuid_1.v4)()}${ext}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];
    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ message: 'Invalid Images' });
    if (fileSize > 5000000)
        return res.status(422).json({ message: 'Image must be less than 1MB' });
    try {
        file.mv(`./public/profil/${fileName}`, (error) => __awaiter(void 0, void 0, void 0, function* () {
            if (error)
                return res.status(500).json({ message: error.message });
            req.filename = fileName;
            next();
        }));
    }
    catch (error) {
        console.log(error);
    }
};
exports.uploadImgProfil = uploadImgProfil;
const updateUserImg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id: _id } = req.params;
    const user = yield (0, user_services_1.getUserImg)(_id);
    let fileName;
    if (req.files === null) {
        fileName = user.imgProfil;
        req.filename = fileName;
        next();
    }
    else {
        const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.imgProfil;
        const fileSize = file.data.length;
        const ext = path_1.default.extname(file.name);
        fileName = `${(0, uuid_1.v4)()}${ext}`;
        const allowedType = ['.png', '.jpg', '.jpeg'];
        if (!allowedType.includes(ext.toLowerCase()))
            return res.status(422).json({ message: 'Invalid Images' });
        if (fileSize > 5000000)
            return res.status(422).json({ message: 'Image must be less than 5 MB' });
        const filepath = `./public/profil/${user.imgProfil}`;
        if (fs_1.default.existsSync(filepath) || user.imgProfil !== 'default-fotoprofil.png') {
            fs_1.default.unlinkSync(filepath);
        }
        file.mv(`./public/profil/${fileName}`, (err) => {
            if (err)
                return res.status(500).json({ message: err.message });
            req.filename = fileName;
            next();
        });
    }
});
exports.updateUserImg = updateUserImg;
//# sourceMappingURL=profil.upload.js.map