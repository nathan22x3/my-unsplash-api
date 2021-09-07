import dotenv from 'dotenv';
import {
  getEnvArray,
  getEnvNumber,
  getEnvString,
} from 'utils/environment.util';
dotenv.config();

const env = {
  mongo: {
    atlasUri: getEnvString('MONGO_ATLAS_URI'),
    databaseName: getEnvString('MONGO_DATABASE_NAME'),
  },
  port: getEnvNumber('PORT', 8076),
  cors: {
    whitelist: getEnvArray('CORS_WHITELIST'),
  },
};

export default env;
