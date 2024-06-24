import axios from 'axios';

import Toast from 'src/components/Toast';

interface AuthError extends Error {
  response: {
    data: {
      error: boolean;
      error_code: string;
    };
  };
}

const ERROR_MESSAGES: { [key: string]: string } = {
  // Old
  'email does not exist!': 'Email does not exist!',
  'account does not exist!': "Account does not exist or it's disabled.",
  'incorrect password!': 'Incorrect Password!',
  internal_server_error: 'Internal Server Error',
  'General information is required!': 'General information is required!',
  'Duplicate entry!': 'Already exists!',
  'Validation error': 'Email already exists!',
  'File required!': 'File required!',
  auth_password_invalid_format: 'Invalid password format!',
  auth_invalid_email: 'Invalid email',
  unauthorized_request: 'You are not authorized to perform this action!',
  auth_token_invalid: 'Your Authentication Token is not valid!',
  'same password': 'Same as previous Password',
  'gender required': 'Gender Required!',
  'Email sent!': 'Email Sent!',
  invalid_user_type: 'Not a valid user account!',
  // Common
  invalid_api: 'Invalid request!',
  field_missing: 'Required Fields are missing!',
  server_error: 'Internal server error!',
  invalid_type: 'Invalid type selected!',
  basic_required: 'General information is required!',
  duplicate: 'Duplicate entry!',
  file: 'File required!',
  validation: 'Already exists!',
  // Auth
  invalid_format: 'Invalid input format!',
  key_invalid_format: 'Invalid format!',
  invalid_email: 'Invalid email!',
  invalid_password: 'Invalid password!',
  invalid_account: 'Account does not exist!',
  account_exists: 'Account already exists!',
  token_expired: 'Your token has expired!',
  token_required: 'Unauthorized request!',
  token_invalid: 'Token invalid!',
  same_password: 'This password is already in-use by you!',
  gender_required: 'Gender field required!',
  email_success: 'Email sent!',
  email_not_verified: 'Email not verified!',
  unauthorized_country: "Country is not accessible on your current plan!",
};

const Api = axios.create();

Api.interceptors.response.use(
  response => response,
  error => {
    const authError = error as AuthError;
    const { response } = authError;
    if (response?.data?.error_code) {
      const errorMessage =
        ERROR_MESSAGES[response?.data?.error_code] === null
          ? String(response?.data?.error_code)
          : String(ERROR_MESSAGES[response?.data?.error_code]);
      Toast.fire({ icon: 'error', title: errorMessage });
    }
    return Promise.reject(error); // throw new Error('Something went wrong');
  },
);

export default Api;
