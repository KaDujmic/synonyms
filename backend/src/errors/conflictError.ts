import { CustomError } from './customError';

// Conflict error for duplicate resources
export class ConflictError extends CustomError {
  constructor(message: string = 'Resource already exists', statusCode: number = 409) {
    super(message, statusCode);
  }
} 