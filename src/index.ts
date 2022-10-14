import express from 'express';
import handleError from './middlewares/errorHandlerMiddleware';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);
//error
app.use(handleError);

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
