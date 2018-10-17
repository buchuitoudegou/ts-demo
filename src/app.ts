import * as Koa from 'koa';
import router from './router';
import * as session from 'koa-session';
import { session_config } from './config';


const app = new Koa();

app.use(session(session_config, app));

app.use(router.routes());

export default app;