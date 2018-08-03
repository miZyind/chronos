import * as httpUtil from '../util/http-util';

// shift
export function getShifts(opts: any): Promise<any> {
  return httpUtil.get(`/api/v1/shiftbymonth/${opts.year}/${opts.month}`);
}
export function getShift(opts: any): Promise<any> {
  return httpUtil.get(`/api/v1/shift/${opts.year}/${opts.month}/${opts.stationid}/${opts.workerid}`);
}
export function postShift(opts: object): Promise<any> {
  return httpUtil.post('/api/v1/shift', opts);
}

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
