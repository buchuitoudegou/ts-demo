"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("./userModel");
const typings_1 = require("./typings");
async function findUser(condition) {
    const result = await userModel_1.default.find(condition);
    const basicResult = [];
    result.forEach((item) => {
        basicResult.push({
            username: item.username,
            userid: item.userid,
            email: item.email,
        });
    });
    return Promise.resolve(basicResult);
}
exports.findUser = findUser;
async function addUser(newUser) {
    let result = await findUser({ username: newUser.username });
    if (result.length > 0) {
        return Promise.resolve(typings_1.DUPLICATED_USERNAME);
    }
    result = await findUser({ email: newUser.email });
    if (result.length > 0) {
        return Promise.resolve(typings_1.DUPLICATED_EMAIL);
    }
    if (newUser.password.length < 6) {
        return Promise.resolve(typings_1.INVALID_PASSWORD);
    }
    const id = (await findUser({})).length;
    newUser.userid = id;
    try {
        await userModel_1.default.create(newUser);
        return Promise.resolve(typings_1.SUCCESS);
    }
    catch (error) {
        console.log(error);
        return Promise.resolve(typings_1.DB_CONNECT_ERROR);
    }
}
exports.addUser = addUser;
//# sourceMappingURL=index.js.map