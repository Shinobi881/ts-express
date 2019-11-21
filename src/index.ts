import express from 'express';
import { router } from './routes/loginRoutes';

const app = express();

const { PORT = 3000 } = process.env;

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
