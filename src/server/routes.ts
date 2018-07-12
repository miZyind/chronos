import Router from 'koa-router';
import WorkController  from './controller/workers';

const router = new Router({ prefix: '/api/v1' });

// GENERAL ROUTES
router.get('/work', WorkController.getWorkers);
router.get('/work/:id', WorkController.getWorker);
router.post('/work', WorkController.createWorker);

export { router };
