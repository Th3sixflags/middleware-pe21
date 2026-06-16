import { Request, Response, NextFunction } from 'express';
import { requestLogger } from './logger.js';
import { jest } from '@jest/globals';

describe('Logger Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    // Inicializamos mocks antes de cada test
    req = { method: 'GET', path: '/api/test' };
    res = {
      statusCode: 200,
      on: jest.fn() as any, // Mock de la función event listener
    };
    next = jest.fn(); // Mock de la función next()
    
    // Espiamos console.log y evitamos que ensucie la terminal durante el test
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    // Limpiamos los mocks después de cada test
    jest.restoreAllMocks();
  });

  it('debe invocar next() al recibir una petición', () => {
    requestLogger(req as Request, res as Response, next);
    
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledTimes(1);
  });

  it('debe registrar el método y la ruta correctamente al finalizar la respuesta', () => {
    requestLogger(req as Request, res as Response, next);

    // Verificamos que res.on se haya llamado con el evento 'finish'
    const onMock = res.on as jest.Mock;
    expect(onMock).toHaveBeenCalledWith('finish', expect.any(Function));

    // Extraemos el callback asociado al evento 'finish' y lo ejecutamos
    const finishCallback = onMock.mock.calls[0][1] as () => void;
    finishCallback(); 

    // Verificamos que console.log registró el método, la ruta y el estado
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('GET /api/test -> 200'));
  });
});