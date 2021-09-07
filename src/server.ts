import env from 'configs/environment.config';
import { connectMongo } from 'configs/mongo.config';
import express from 'express';
import apiRoutes from 'routes/api.routes';
import cors from 'cors';
import HttpStatusCode from 'utils/http-status-code.util';

connectMongo()
  .then(() => console.log('Connected to MongoDB successfully!'))
  .then(() => bootServer())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();

  // Middlewares
  const whitelist = env.cors.whitelist;
  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      if (whitelist.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: HttpStatusCode.OK,
  };
  app.use(cors(corsOptions));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // API Routes
  app.use('/api', apiRoutes);

  // Server listenning
  const port = env.port;
  app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
  );
};
