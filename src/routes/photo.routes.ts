import PhotoController from 'controllers/photo.controller';
import { Router } from 'express';
import PhotoValidation from 'validations/photo.validation';

const router = Router();

router.route('/all').get(PhotoController.getAll);
router.route('/add').post(PhotoValidation.addNew, PhotoController.addNew);

export default router;
