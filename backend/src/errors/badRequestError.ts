import { CustomError } from './customError';

// Bad request error for malformed requests
export class BadRequestError extends CustomError {
  constructor(message: string = 'Bad request', statusCode: number = 400) {
    super(message, statusCode);
  }
} 