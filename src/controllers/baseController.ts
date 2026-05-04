import { Response } from 'express';

export abstract class BaseController {
  protected success<T>(res: Response, data: T, statusCode = 200): void {
    res.status(statusCode).json(data);
  }

  protected error(res: Response, message: string, statusCode = 500, details?: unknown): void {
    res.status(statusCode).json({
      message,
      ...(details ? { error: details } : {})
    });
  }
}
