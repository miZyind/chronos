import Router from 'koa-router';
import WorkController from './controller/worker';
import StationController from './controller/station';

const router = new Router({ prefix: '/api/v1' });

router.get('/worker', WorkController.getAll);
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

export { router };
