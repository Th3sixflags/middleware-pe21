import express, { Request, Response, NextFunction } from 'express';
import { requestLogger } from './middlewares/logger.js';
import { requireApiKey } from './middlewares/auth.js';

//importamos las rutas v1, v2 para inscripciones
import v1Inscripciones from './routes/v1/inscripciones.js';
import v2Inscripciones from './routes/v2/inscripciones.js';

const app = express();

app.use(express.json());      //1. Parseo del cuerpo
app.use(requestLogger);       //2. Logger
app.use(requireApiKey);       //3. Autenticación

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

app.use('/v1/inscripciones', v1Inscripciones);
app.use('/v2/inscripciones', v2Inscripciones);

app.get('/v1', (req, res, next) => {
  
})

// Manejador de errores: siempre al final, con cuatro parametros
app.use((_err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(3000, () => console.log('Servidor en puerto 3000'));
