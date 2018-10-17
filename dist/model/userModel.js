"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: String,
    password: String,
    userid: Number,
    email: String
});
const userModel = db_1.default.model('User', UserSchema);
exports.default = userModel;
//# sourceMappingURL=userModel.js.map