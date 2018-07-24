import 'koa';
import * as ws from 'ws';
import JsonDB from 'node-json-db';
declare module 'koa' {
  interface Context {
    db: JsonDB;
    browserWS: { [key: string]: ws; };
    piWS: { [key: string]: ws; };
    piTimer: { [key: string]: NodeJS.Timer | null; };
    websocket: ws;
  }
  interface Request {
    body: any;
    rawBody: any;
  }
}
