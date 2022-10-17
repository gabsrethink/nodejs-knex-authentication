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
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction,
) {
  let customError = error;

  if (!(error instanceof CustomError)) {
    let status = response.locals.status ? response.locals.status : 500;
    customError = new CustomError(error.message, status);
  }

  response.status((customError as CustomError).status).send(customError);
}

export default handleError;
