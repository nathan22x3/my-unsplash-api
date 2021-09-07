import env from 'configs/environment.config';
import { connectMongo } from 'configs/mongo.config';
import express from 'express';

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
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // API Routes
  app.get('/', (_, res) => res.json({ greeting: 'Hello World!' }));

  // Server listenning
  const port = env.server.port;
  app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`)
  );
};
