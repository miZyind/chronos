import * as httpUtil from '../util/http-util';

export function register(opts?: object): Promise<any> {
  return httpUtil.get('/api/v1/worker', opts);
}
