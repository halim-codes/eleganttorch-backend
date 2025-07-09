import { HttpStatus } from '@nestjs/common';

export function handleMongooseError(error: any): {
  statusCode: number;
  message: string;
} {
  // Validation Error (e.g. missing required fields)
  if (error.name === 'ValidationError' && error.errors) {
    const message = Object.values(error.errors)
      .map((err: any) => err.message)
      .join(', ');

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message,
    };
  }

  // Duplicate key error (e.g. unique constraint)
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: `Duplicate value for field: ${field}`,
    };
  }

  // Default fallback
  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: error.message || 'Internal server error',
  };
}
