import * as httpUtil from '../util/http-util';

// worker
export function getWorkers(): Promise<any> {
  return httpUtil.get('/api/v1/worker');
}
export function postWorker(opts: object): Promise<any> {
  return httpUtil.post('/api/v1/worker', opts);
}
export function putWorker(opts: object): Promise<any> {
  return httpUtil.put('/api/v1/worker', opts);
}
export function deleteWorker(opts: object): Promise<any> {
  return httpUtil.del('/api/v1/worker', opts);
}

// stations
export function getStations(opts: string): Promise<any> {
  return httpUtil.get(`/api/v1/station/area/${opts}`);
}
export function postStation(opts: object): Promise<any> {
  return httpUtil.post('/api/v1/station', opts);
}
export function putStation(opts: object): Promise<any> {
  return httpUtil.put('/api/v1/station', opts);
}
export function deleteStation(opts: object): Promise<any> {
  return httpUtil.del('/api/v1/station', opts);
}
