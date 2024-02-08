"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const posterSchema = new mongoose_1.default.Schema({
    content_id: {
        type: String,
        unique: true
    },
    tittle: {
        type: String
    },
    description: {
        type: String
    },
    imgContent: {
        public_id: { type: String },
        urlContent: { type: String }
    },
    user_id: {
        type: String
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true
});
const PosterModel = mongoose_1.default.model('poster', posterSchema);
exports.default = PosterModel;
//# sourceMappingURL=content.models.js.map