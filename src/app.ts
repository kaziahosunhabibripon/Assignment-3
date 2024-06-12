import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello From Car Wash Booking System!'
  });
});

export default app;
