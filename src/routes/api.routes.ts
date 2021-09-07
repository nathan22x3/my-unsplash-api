import PhotoRoutes from 'routes/photo.routes';
import { Router } from 'express';

const router = Router();

router.use('/photos', PhotoRoutes);

export default router;
