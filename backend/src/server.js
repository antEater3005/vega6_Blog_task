import express from 'express';
import { PORT } from './config/index.js';
import expressApp from './expressApp.js';
import { dbConnect } from './config/connectDB.js';

const startServer = async () => {
  const app = express();
  // Connect to db
  await dbConnect();

  // initialize express app
  await expressApp(app);

  // Start server
  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
      console.log(err);
      process.exit(1);
    });
};

startServer();
