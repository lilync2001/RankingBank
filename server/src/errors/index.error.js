export const STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    UN_AUTHORISED: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
  };
  
  class AppError extends Error {
    constructor(
      message,
      errorStack,
      statusCode,
      description,
      isOperational,
      logingErrorResponse
    ) {
      super(description);
      Object.setPrototypeOf(this, new.target.prototype);
      this.message = message;
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      this.errorStack = errorStack;
      this.logError = logingErrorResponse;
      Error.captureStackTrace(this);
    }
  }
  
  //api Specific Errors
  export class APIError extends AppError {
    constructor(
      message,
      errorStack,
      statusCode = STATUS_CODES.INTERNAL_ERROR,
      description = "Internal Server Error",
      isOperational = true
    ) {
      super(message, errorStack, statusCode, description, isOperational);
    }
  }
  
  export class CustomError extends Error {
    constructor(message, statusCode, originalError) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode || 500; // Por defecto, un error de servidor interno
      this.originalError = originalError;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export default { APIError, STATUS_CODES, CustomError };
  