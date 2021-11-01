import PhotoRoutes from '@app/routes/photo.routes';
import { Router } from 'express';

const router = Router();

router.use('/photos', PhotoRoutes);

export default router;
