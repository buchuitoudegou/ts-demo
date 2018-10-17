"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.port = 8080;
exports.DB_URL = 'mongodb://localhost:27017/db';
exports.session_config = {
    key: 'koa:sess',
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
    renew: false,
};
//# sourceMappingURL=index.js.map