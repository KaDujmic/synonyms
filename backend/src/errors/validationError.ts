import { CustomError } from './customError';

// Validation error for invalid input data
export class ValidationError extends CustomError {
  constructor(message: string, statusCode: number = 400) {
    super(message, statusCode);
  }
} 