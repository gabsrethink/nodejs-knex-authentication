import { NextFunction, Request, Response } from 'express';

export class CustomError {
  message!: string;
  status!: number;
  stack!: string;

  constructor(message: string, status: number = 500) {
    this.message = message;
    this.status = status;
  }
}

function handleError(
  error: CustomError,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  let customError = error;

  if (!(error instanceof CustomError)) {
    customError = new CustomError('Something went wrong!');
  }

  response.status((customError as CustomError).status).send(customError);
}

export default handleError;
