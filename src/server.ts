import env from '@app/configs/environment.config';
import { connectMongo } from '@app/configs/mongo.config';
import colorizeMorgan from '@app/middlewares/morgan.middleware';
import apiRoutes from '@app/routes/api.routes';
import { HttpStatusCode } from '@app/utils/http.util';
import cors from 'cors';
import express from 'express';

connectMongo()
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const app = express();

// Middlewares
const whitelist = env.cors.whitelist;
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: HttpStatusCode.OK,
};
app.use(cors(corsOptions));

app.use(colorizeMorgan);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API Routes
app.use('/api', apiRoutes);

// Server listenning
const port = env.port;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);

export default app;
