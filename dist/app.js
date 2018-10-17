"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const router_1 = require("./router");
const session = require("koa-session");
const config_1 = require("./config");
const app = new Koa();
app.use(session(config_1.session_config, app));
app.use(router_1.default.routes());
exports.default = app;
//# sourceMappingURL=app.js.map