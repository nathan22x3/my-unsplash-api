import { NextFunction, Request, Response } from 'express';
import PhotoModel from 'models/photo.model';
import HttpStatusCode from 'utils/http-status-code.util';

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

export default { addNew };
