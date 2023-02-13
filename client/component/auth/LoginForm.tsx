import React, { useEffect, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../lib/auth';
import InputError from '../forms/InputError';
import {BiMessageRoundedError} from 'react-icons/bi'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface Props {}

const validationSchema = Yup.object().shape({
  email: Yup.string().label('Email').email().required(),
  password: Yup.string().label('Password').required(),
});

const LoginForm = (props: Props) => {

  const [response, setResponse] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  
  let router = useRouter();

  const handleRedirect = () => {
    setTimeout(() => {
      let jwtToken = Cookies.get('token')
        if (jwtToken) {
          router.push('/')
        }
    }, 500);
  }

  const { signIn } = useAuth();
  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          setSubmitted(true);
          let response = await signIn(data);
          if (response) {
            setResponse(response);
          }
          setSubmitting(false);
          setSubmitted(false);
        }}
      >
        {({ isSubmitting, handleSubmit, handleBlur, handleChange }) => (
          <Form
            className='pt-16 flex flex-col w-2/3 m-auto gap-6'
            onSubmit={handleSubmit}
          >
            <Field
              placeholder='email'
              name='email'
              type='input'
              as={InputError}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Field
              placeholder='password'
              name='password'
              type='password'
              as={InputError}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <button type='submit' disabled={isSubmitting} onClick={() => handleRedirect()}>
              Log in
            </button>
            {
              response && response !== 'success' && submitted === true ? 
              <div className='text-xs text-red flex items-center gap-3'>
                <BiMessageRoundedError className='w-6 h-6'/>
                <p>Please enter the correct information</p>
              </div> : ""
            }
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
