"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const usersSchema = new mongoose_1.default.Schema({
    user_id: {
        type: String,
        unique: true
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    imgProfil: {
        type: String
    },
    profilUrl: {
        type: String
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: false
    }
});
const UserModel = mongoose_1.default.model('users', usersSchema);
exports.default = UserModel;
//# sourceMappingURL=users.models.js.map