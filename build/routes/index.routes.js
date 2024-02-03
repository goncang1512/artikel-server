"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const user_routes_1 = require("./user.routes");
const content_routes_1 = require("./content.routes");
const auth_routes_1 = require("./auth.routes");
const _routes = [
    ['/api', user_routes_1.UserRouter],
    ['/api', content_routes_1.ContentRouter],
    ['/api', auth_routes_1.AuthRouter]
];
const routes = (app) => {
    _routes.forEach((route) => {
        const [url, router] = route;
        app.use(url, router);
    });
};
exports.routes = routes;
//# sourceMappingURL=index.routes.js.map