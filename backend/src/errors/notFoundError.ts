import { CustomError } from './customError';

// Not found error for missing resources
export class NotFoundError extends CustomError {
  constructor(message: string = 'Resource not found', statusCode: number = 404) {
    super(message, statusCode);
  }
} 