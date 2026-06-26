import { requireJwt } from './auth.js';
import { Request, Response, NextFunction } from 'express';

describe('requireJwt Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = { headers: {} };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it('debe retornar 401 si el token está ausente', () => {
    requireJwt(mockRequest as Request, mockResponse as Response, nextFunction);
    expect(mockResponse.status).toHaveBeenCalledWith(401);
  });
});