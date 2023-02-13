import React from 'react';
import { useField } from 'formik';
import Input, { InputProps } from './Input';

const InputError = (props: InputProps) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <>
      <Input {...field} {...props} />
      {errorText && <span>{errorText}</span>}
    </>
  );
};

export default InputError;
