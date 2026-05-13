import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';

export function validateRequest(schema: ZodSchema) {
  return (request: Request, response: Response, next: NextFunction) => {
    const result = schema.safeParse({
      body: request.body,
      params: request.params,
      query: request.query,
    });

    if (!result.success) {
      return response.status(400).json({
        message: 'Validation error',
        errors: result.error.flatten(),
      });
    }

    request.body = result.data.body ?? request.body;
    request.params = result.data.params ?? request.params;
    request.query = result.data.query ?? request.query;

    return next();
  };
}