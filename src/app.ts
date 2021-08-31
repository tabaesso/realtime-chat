import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use((err: any, request: Request, response: Response, _: NextFunction) => {
  console.error(err);

  return response.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message,
  });
});

app.listen(3000, () => {
  console.log('.:::::::::. Servidor online .:::::::::.');
})