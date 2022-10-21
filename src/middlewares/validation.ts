import { NextFunction, Response, Request } from 'express';
import * as Yup from 'yup';

export type registerUser = {
  name: string;
  email: string;
  password: string;
};

const nameRegex = /^[a-z ,.'-]+$/i;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export async function validate(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const userSchema = Yup.object().shape({
      name: Yup.string()
        .matches(nameRegex, 'This name has a invalid character')
        .required('name property is required'),
      email: Yup.string()
        .email('This email is invalid')
        .required('email property is required'),
      password: Yup.string()
        .matches(
          passwordRegex,
          'Password Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character',
        )
        .required('password property is required')
        .min(8),
    });
    await userSchema.validate(request.body);
    next();
  } catch (error) {
    response.locals.status = 400;
    next(error);
  }
}
