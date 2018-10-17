"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
mongoose.connect(config_1.DB_URL, { useNewUrlParser: false });
mongoose.connection.on('connected', () => {
    console.log(`mongoose connection open to ${config_1.DB_URL}`);
});
mongoose.connection.on('error', (err) => {
    console.log(`mongoose connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
    console.log(`mongoose disconnect`);
});
exports.default = mongoose;
//# sourceMappingURL=db.js.map