import PhotoController from 'controllers/photo.controller';
import { Router } from 'express';
import PhotoValidation from 'validations/photo.validation';

const router = Router();

router.route('/').get(PhotoController.getWithLimit);
router.route('/all').get(PhotoController.getAll);
router.route('/add').post(PhotoValidation.addNew, PhotoController.addNew);
router
  .route('/delete/:id')
  .delete(PhotoValidation.deleteById, PhotoController.deleteById);

export default router;
