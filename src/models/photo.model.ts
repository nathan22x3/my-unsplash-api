import axios from 'axios';
import { getDatabase } from 'configs/mongo.config';
import Joi from 'joi';
import { urlRegex } from 'utils/regex.util';

export interface Photo {
  label: string;
  url: string;
  createdAt?: number;
}

const schema = Joi.object<Photo>({
  label: Joi.string()
    .min(5)
    .message('Label length must be at least 5 characters long')
    .max(50)
    .message('Label length must be less than or equal to 50 characters long')
    .required(),
  url: Joi.string()
    .regex(urlRegex)
    .message('Please provide a valid URL')
    .required(),
  createdAt: Joi.number().default(Date.now()),
});

const getAll = async () => {
  try {
    const allDocs = await getDatabase()
      .collection<Photo>('photos')
      .aggregate([{ $sort: { createdAt: -1 } }])
      .toArray();
    return allDocs;
  } catch (error) {
    throw new Error(error).message;
  }
};

const addNew = async (data: Photo) => {
  try {
    const photoURL = await axios.get(data.url);

    if (photoURL.headers['content-type'].startsWith('image')) {
      const validatedDoc: Photo = await schema.validateAsync(data, {
        abortEarly: false,
      });

      const insertedDoc = await getDatabase()
        .collection<Photo>('photos')
        .insertOne(validatedDoc)
        .then(() => validatedDoc);

      return insertedDoc;
    }
  } catch (error) {
    throw new Error(error).message;
  }
};

export default { schema, getAll, addNew };
