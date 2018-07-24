// Node Module
import Koa from 'koa';
import { format } from 'url';
import serve from 'koa-static';
import JsonDB from 'node-json-db';
import koaLogger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import { router } from './routes';
// Lib
import logger from '#lib/logger';
// Middleware
import hmrMiddleware from './middleware/hmr-middleware';
// Config
import config from './config';
// Env
const { isDev, dist, name, version, connection, dbPath } = config;
const { protocol, host, port, path } = connection;
const address = format({ protocol, hostname: host, port, pathname: path });
const printMsg = () => logger.info(`${name} v${version} [Address] ${address} [Mode] ${isDev ? '⚙️' : '🌎'}`);

// const router = new Router();
// Init App
const app = new Koa();
// Init JsonDB
app.context.db = new JsonDB(dbPath, true, true);

if (isDev) {
  app
    .use(koaLogger())
    .use(hmrMiddleware());
} else {
  app
    .use(serve(dist));
}

app
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(port, printMsg);
