export class CustomError {
  static createError({ name = "Error", cause, message, errorCode = 1 }) {
    const error = new Error(cause);
    error.name = name;
    error.message = message;
    error.code = errorCode;

    throw error;
  }
}
