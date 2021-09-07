import { Db, MongoClient } from 'mongodb';
import env from 'configs/environment.config';

const client = new MongoClient(env.mongo.atlasUri);
let database: Db;

export const connectMongo = async () => {
  try {
    await client.connect();
    database = client.db(env.mongo.databaseName);
  } finally {
    await client.close();
  }
};

export const getDatabase = () => {
  if (!database) throw new Error('Must connect to Mongo first!');
  return database;
};
