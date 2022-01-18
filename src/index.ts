import express from 'express';
import routes from './routes/index';

const port = 3000;

const app = express();

app.use('/api', routes);

app.listen(port, () => {
  console.log('Listenning at port 3000');
});
