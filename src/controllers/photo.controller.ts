import { Request, Response } from 'express';
import PhotoService from 'services/photo.service';
import { HttpStatusCode } from 'utils/http.util';

const getWithLimit = async (req: Request, res: Response) => {
  try {
    const { limit, next_cursor } = req.query;
    const data = await PhotoService.getWithLimit(
      Number(limit),
      next_cursor as string
    );

    res.status(HttpStatusCode.OK).json({
      data,
      limit: limit || 10,
      next_cursor: data.length ? data[data.length - 1]._id : '',
    });
  } catch (error) {
    res.status(HttpStatusCode.NOT_FOUND).json({ errors: error });
  }
};

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

const deleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPhoto = await PhotoService.deleteById(id);
    res.status(HttpStatusCode.OK).json(deletedPhoto);
  } catch (error) {
    res.status(HttpStatusCode.BAD_REQUEST).json({ errors: error });
  }
};

export default { getWithLimit, getAll, addNew, deleteById };
