export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // super calls the parent constructor
    this.statusCode = statusCode;
  }
}
