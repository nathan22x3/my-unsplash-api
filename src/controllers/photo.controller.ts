import PhotoService from '@app/services/photo.service';
import { HttpStatusCode } from '@app/utils/http.util';
import { Request, Response } from 'express';

const getWithLimit = async (req: Request, res: Response) => {
  try {
    const { limit, next_cursor } = req.query;
    const data = await PhotoService.getWithLimit(
      Number(limit || 10),
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

const addNew = async (req: Request, res: Response) => {
  try {
    const insertedPhoto = await PhotoService.addNew(req.body);
    res.status(HttpStatusCode.CREATED).json(insertedPhoto);
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({ errors: error });
  }
};

const deleteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPhoto = await PhotoService.deleteById(id);
    res.status(HttpStatusCode.OK).json(deletedPhoto);
  } catch (error) {
    res.status(HttpStatusCode.NOT_FOUND).json({ errors: error });
  }
};

export default { getWithLimit, addNew, deleteById };
