import * as React from 'react';

import EyeToggleButton from 'src/components/EyeToggleButton';

export interface InputProps {
  text: string;
  type?: string;
  placeholder?: string;
  formik: {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  };
  value: string;
  error?: string | boolean;
}

export const Input = ({ type = 'text', text, placeholder, value, formik, error }: InputProps) => {
  return (
    <div>
      <input
        type={type}
        name={text}
        className='border-2 w-full h-12 px-3 rounded-lg focus:outline-none'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={value}
        placeholder={placeholder}
      />
      <div className='text-red-500 my-1'>{error}</div>
    </div>
  );
};

export const PasswordInput = ({ value, formik, error, text }: InputProps) => {
  const [show, setShow] = React.useState(false);

  const toggle = () => {
    setShow(!show);
  };

  return (
    <div className='relative'>
      <Input
        type={show ? 'text' : 'password'}
        text={text}
        placeholder='Enter your password'
        formik={formik}
        value={value}
        error={error}
      />
      <EyeToggleButton show={show} toggle={toggle} />
    </div>
  );
};

export default Input;
