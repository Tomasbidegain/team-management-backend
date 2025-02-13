import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/hola', (req: Request, res: Response) => {
  res.send('API funcionando con TypeScript');
});

export default app;
