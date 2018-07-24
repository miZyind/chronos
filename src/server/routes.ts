import Router from 'koa-router';
import WorkController from './controller/workers';

const router = new Router({ prefix: '/api/v1' });

// GENERAL ROUTES
router.get('/worker', WorkController.getAll);
router.get('/worker/:id', WorkController.getOne);
router.post('/worker', WorkController.add);
router.put('/worker', WorkController.edit);
router.delete('/worker', WorkController.delete);
export { router };
