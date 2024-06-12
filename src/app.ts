import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/api/v1', router);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

export default app;