import PhotoController from '@app/controllers/photo.controller';
import PhotoValidation from '@app/validations/photo.validation';
import { Router } from 'express';

const router = Router();

router.route('/').get(PhotoController.getWithLimit);
router.route('/add').post(PhotoValidation.addNew, PhotoController.addNew);
router
  .route('/delete/:id')
  .delete(PhotoValidation.deleteById, PhotoController.deleteById);

export default router;
