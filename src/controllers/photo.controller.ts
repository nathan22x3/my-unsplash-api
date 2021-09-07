import { Request, Response } from 'express';
import PhotoService from 'services/photo.service';
import HttpStatusCode from 'utils/http-status-code.util';

const getAll = async (_: Request, res: Response) => {
  try {
    const allPhotos = await PhotoService.getAll();
    res.status(HttpStatusCode.OK).json(allPhotos);
  } catch (error) {
    res.status(HttpStatusCode.NOT_FOUND).json({ errors: error });
  }
};

const addNew = async (req: Request, res: Response) => {
  try {
    const insertedPhoto = await PhotoService.addNew(req.body);
    res.status(HttpStatusCode.CREATED).json(insertedPhoto);
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ errors: error });
  }
};

export default { getAll, addNew };
