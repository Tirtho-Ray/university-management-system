/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHendeler';
import notFound from './app/middleware/notFoundRoute';
import router from './app/routes';
import { promise } from 'zod';
const app: Application = express();


// parsers
app.use(express.json());
app.use(cors());

// application
app.use('/api/v1',router);

const test =async (req:Request,res:Response)=>{
  Promise.reject()
}
app.get('/',test)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// middleware
// eslint-disable-next-line @typescript-eslint/no-explicit-any, 
app.use(globalErrorHandler);
// not found route
app.use(notFound);
export default app;
