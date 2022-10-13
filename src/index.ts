import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);
//error

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
