import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import { router } from './routes/loginRoutes';

const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({ keys: ['fasdfsdf'] }));
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
