import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors';

// Utility function to wrap async route handlers with error handling
export const callbackErrorHandler = (callback: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next);
  };
};

// Main error handling middleware
export const errorMiddleware = (
  err: any, 
  req: Request, 
  res: Response, 
  next: NextFunction
): void => {
  if (res.headersSent) {
    return next(err);
  }

  // Handle custom errors
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ 
      status: err.statusCode,
      error: err.name,
      message: err.message 
    });
    return;
  }

  // Handle specific error types
  if (err.name === 'ValidationError') {
    res.status(err.statusCode || 400).json({ 
      status: err.statusCode || 400,
      error: 'ValidationError',
      message: err.message 
    });
    return;
  } else {
    console.error(err);
    res.status(err.statusCode ?? 500).json({
      status: err.statusCode ?? 500,
      error: 'InternalServerError',
      message: err.message ?? 'Oops, something went wrong!'
    });
    return;
  }
}; 