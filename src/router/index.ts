import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import { addUser, findUser } from '../model';
import { IUser, SUCCESS, DUPLICATED_EMAIL, DUPLICATED_USERNAME, INVALID_PASSWORD, IUserBasic } from '../model/typings';

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
    } else if (ctx.session.username !== ctx.query.username) {
      ctx.body = {
        msg: '非法查询',
        status: 'NO_ACCESS'
      };
      ctx.status = 403;
    } else {
      const result: IUserBasic[] = await findUser({ username: ctx.query.username } as IUser);
      ctx.body = {
        msg: '查询成功',
        status: 'OK',
        data: result
      };
      ctx.status = 200;
    }
  })
  .post('/signup', async (ctx) => {
    const newUser: IUser = (ctx.request.body as IUser);
    const result = await addUser(newUser);
    const resData = {
      status: 'OK',
      msg: ''
    };
    switch(result) {
      case SUCCESS: resData.msg = '注册成功';break;
      case DUPLICATED_EMAIL: resData.msg = '邮箱已被注册';break;
      case DUPLICATED_USERNAME: resData.msg = '用户名已被注册';break;
      case INVALID_PASSWORD: resData.msg = '密码至少6位';break;
      default: resData.msg = '未知错误';break;
    }
    if (result === SUCCESS) {
      ctx.status = 200;
    } else {
      ctx.status = 404;
    }
    ctx.body = resData;
  })
  .put('/signin', async (ctx) =>{
    const signinUser: IUser = (ctx.request.body as IUser);
    const result: IUserBasic[] = await findUser({ username: signinUser.username } as IUser);
    const resData = {
      msg: '',
      status: ''
    };
    if (result.length === 0) {
      resData.msg = '用户名不存在';
      resData.status = 'SIGN_IN_FAIL';
      ctx.status = 400;
    } else if (result[0].password !== signinUser.password) {
      resData.msg = '密码错误';
      resData.status = 'PWD_ERROR';
      ctx.status = 401;
    } else {
      resData.msg = '登录成功';
      resData.status = 'OK';
      ctx.session.username = signinUser.username;
    }
    ctx.body = resData;
  });

export default router;