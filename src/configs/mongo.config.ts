import env from '@app/configs/environment.config';
import { MongoClient } from 'mongodb';

const client = new MongoClient(env.mongo.atlasUri);

export const connectMongo = async () => {
  await client.connect();
};

export const getDatabase = () => {
  try {
    return client.db(env.mongo.databaseName);
  } catch (error) {
    throw new Error('Must connect to Mongo first!');
  }
};
