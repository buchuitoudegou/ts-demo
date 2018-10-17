"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const model_1 = require("../model");
const typings_1 = require("../model/typings");
const router = new Router();
router.use(bodyParser());
/// 18/10/07 修改get /user，判断登录状态返回查询结果
/// 已登录（session.username === query.username）：返回当前用户信息
/// 未登录，或者session.username !== query.username，返回未登录msg
router
    .get('/test', (ctx) => {
    ctx.body = 'hello';
})
    .get('/user', async (ctx) => {
    if (!ctx.session.username) {
        ctx.body = {
            msg: '用户未登录',
            status: 'UNAUTHENTIFIED'
        };
        ctx.status = 404;
    }
    else if (ctx.session.username !== ctx.query.username) {
        ctx.body = {
            msg: '非法查询',
            status: 'NO_ACCESS'
        };
        ctx.status = 403;
    }
    else {
        const result = await model_1.findUser({ username: ctx.query.username });
        ctx.body = {
            msg: '查询成功',
            status: 'OK',
            data: result
        };
        ctx.status = 200;
    }
})
    .post('/signup', async (ctx) => {
    const newUser = ctx.request.body;
    const result = await model_1.addUser(newUser);
    const resData = {
        status: 'OK',
        msg: ''
    };
    switch (result) {
        case typings_1.SUCCESS:
            resData.msg = '注册成功';
            break;
        case typings_1.DUPLICATED_EMAIL:
            resData.msg = '邮箱已被注册';
            break;
        case typings_1.DUPLICATED_USERNAME:
            resData.msg = '用户名已被注册';
            break;
        case typings_1.INVALID_PASSWORD:
            resData.msg = '密码至少6位';
            break;
        default:
            resData.msg = '未知错误';
            break;
    }
    if (result === typings_1.SUCCESS) {
        ctx.status = 200;
    }
    else {
        ctx.status = 404;
    }
    ctx.body = resData;
})
    .put('/signin', async (ctx) => {
    const signinUser = ctx.request.body;
    const result = await model_1.findUser({ username: signinUser.username });
    const resData = {
        msg: '',
        status: ''
    };
    if (result.length === 0) {
        resData.msg = '用户名不存在';
        resData.status = 'SIGN_IN_FAIL';
        ctx.status = 400;
    }
    else if (result[0].password !== signinUser.password) {
        resData.msg = '密码错误';
        resData.status = 'PWD_ERROR';
        ctx.status = 401;
    }
    else {
        resData.msg = '登录成功';
        resData.status = 'OK';
        ctx.session.username = signinUser.username;
    }
    ctx.body = resData;
});
exports.default = router;
//# sourceMappingURL=index.js.map