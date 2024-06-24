/* eslint-disable camelcase */
import * as Yup from 'yup';

export const first_name = Yup.string()
  .min(2, 'First name cannot be less than 2 characters')
  .max(60, 'First name cannot be greater than 20 characters')
  .required('First name is required');

export const lastName = Yup.string()
  .min(2, 'Last name cannot be less than 2 characters')
  .max(60, 'Last name cannot be greater than 20 characters')
  .required('Last name is required');

export const password = Yup.string()
  .matches(
    /(?=^.{8,}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)[0-9a-zA-Z!@#$%^&*()]*$/,
    'Must Contain 8 Characters, at-least One Uppercase, One Lowercase and One Number',
  )
  .required('Password is required');

export const loginPassword = Yup.string().required('Password is required');

export const confirm_password = Yup.string()
  .oneOf([Yup.ref('password')], 'Passwords must match')
  .required('Confirm Password is required');

export const email = Yup.string().email('Invalid email address').required('Email is required');

export const validationSignupSchema = Yup.object({
  first_name,
  last_name: lastName,
  password,
  confirm_password,
  email,
});
export const validationLoginSchema = Yup.object({
  email,
  password: loginPassword,
});
