"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRouter = void 0;
const express_1 = require("express");
const logger_1 = require("../utils/logger");
const content_controller_1 = require("../controller/content.controller");
const validation_1 = require("../middleware/validation");
const content_upload_1 = require("../middleware/content.upload");
exports.ContentRouter = (0, express_1.Router)();
exports.ContentRouter.get('/content', content_controller_1.getContentUser, () => {
    logger_1.logger.info('Success get content data');
});
exports.ContentRouter.post('/content/:id', validation_1.createContentValidation, content_upload_1.uploadImgContent, content_controller_1.uplaodContent, () => {
    logger_1.logger.info('Success add new content');
});
exports.ContentRouter.patch('/content/:id', validation_1.updateContentValidation, content_upload_1.updatePoster, content_controller_1.updateContent, () => {
    logger_1.logger.info('Success update content');
});
exports.ContentRouter.delete('/content/:id', content_controller_1.deleteContent, () => {
    logger_1.logger.info('Success deleted content');
});
exports.ContentRouter.get('/content/search', content_controller_1.getContentQuery, () => {
    logger_1.logger.info('Success get content by query');
});
//# sourceMappingURL=content.routes.js.map