import PhotoModel from '@app/models/photo.model';
import { HttpStatusCode } from '@app/utils/http.util';
import { ObjectId } from 'bson';
import { NextFunction, Request, Response } from 'express';

const addNew = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await PhotoModel.schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: new Error(error).message });
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(new ObjectId(id))) throw new Error();

    next();
  } catch (error) {
    res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ errors: new Error(error).message });
  }
};

export default { addNew, deleteById };
