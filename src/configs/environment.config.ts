import {
  getEnvArray,
  getEnvNumber,
  getEnvString,
} from '@app/utils/environment.util';
import dotenv from 'dotenv';
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
