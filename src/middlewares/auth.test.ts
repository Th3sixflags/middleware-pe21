import { Request, Response, NextFunction } from 'express';
import { requireApiKey } from './auth.js';
import { jest } from '@jest/globals';

describe('Auth Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let statusMock: jest.Mock;
  let jsonMock: jest.Mock;

  beforeEach(() => {
    req = { headers: {} };
    
    jsonMock = jest.fn();
    // status() devuelve un objeto con json() para permitir res.status(401).json(...)
    statusMock = jest.fn().mockReturnValue({ json: jsonMock }); 
    res = { status: statusMock as any };
    
    next = jest.fn();
  });

  it('debe devolver status 401 si el header x-api-key está ausente', () => {
    requireApiKey(req as Request, res as Response, next);
    
    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({ error: 'API key inválida o ausente' });
    expect(next).not.toHaveBeenCalled();
  });

  it('debe devolver status 401 si la clave es incorrecta', () => {
    req.headers = { 'x-api-key': 'clave-incorrecta' };
    requireApiKey(req as Request, res as Response, next);
    
    expect(statusMock).toHaveBeenCalledWith(401);
    expect(jsonMock).toHaveBeenCalledWith({ error: 'API key inválida o ausente' });
    expect(next).not.toHaveBeenCalled();
  });

  it('debe invocar next() sin emitir respuesta si la clave es válida', () => {
    req.headers = { 'x-api-key': 'secreto-demo' };
    requireApiKey(req as Request, res as Response, next);
    
    expect(next).toHaveBeenCalled();
    expect(statusMock).not.toHaveBeenCalled();
    expect(jsonMock).not.toHaveBeenCalled();
  });
});