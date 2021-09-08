import axios from 'axios';
import { ObjectId } from 'bson';
import { getDatabase } from 'configs/mongo.config';
import Joi from 'joi';
import { urlRegex } from 'utils/regex.util';

export interface Photo {
  _id: ObjectId;
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

const getWithLimit = async (
  limit: number = 10,
  next_cursor: string = '000000000000' // ObjectId format
) => {
  try {
    const docs = await getDatabase()
      .collection<Photo>('photos')
      .find({ _id: { $gt: new ObjectId(next_cursor) } })
      .limit(limit)
      .toArray();

    return docs || [];
  } catch (error) {
    throw new Error(error).message;
  }
};

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

const deleteById = async (id: string) => {
  try {
    const deletedDoc = await getDatabase()
      .collection<Photo>('photos')
      .findOneAndDelete({ _id: new ObjectId(id) });

    return deletedDoc.value;
  } catch (error) {
    throw new Error(error).message;
  }
};

export default { schema, getWithLimit, getAll, addNew, deleteById };
