import Router from 'koa-router';
import WorkController from './controller/worker';
import StationController from './controller/station';
import ShiftController from './controller/shift';
import CountController from './controller/count';

const router = new Router({ prefix: '/api/v1' });

router.get('/worker', WorkController.getAll);
router.post('/worker/search', WorkController.getSearch);
router.get('/worker/:id', WorkController.getOne);
router.post('/worker', WorkController.add);
router.put('/worker', WorkController.edit);
router.delete('/worker', WorkController.delete);

router.get('/station', StationController.getAll);
router.get('/station/:id', StationController.getOne);
router.get('/station/area/:area', StationController.getAllByArea);
router.post('/station', StationController.add);
router.put('/station', StationController.edit);
router.delete('/station', StationController.delete);

router.get('/shift', ShiftController.getAll);
router.get('/shift/:year/:month/:stationid/:workerid', ShiftController.getSingleWorkerByMonth);
router.get('/shiftbymonth/:year/:month/', ShiftController.getOneByMonth);
router.post('/shift', ShiftController.edit);
router.get('/shift1/:year/:month/:stationarea/:stationstart/:count', ShiftController.getShiftByWorker);

router.get('/shift', ShiftController.getAll);

router.get('/count/:year/:month/', CountController.getAllByMonth);
router.get('/countbyworker/:year/:month/:worker', CountController.getOneByWorker);

router.delete('/shift', ShiftController.deleteOne);

export { router };
