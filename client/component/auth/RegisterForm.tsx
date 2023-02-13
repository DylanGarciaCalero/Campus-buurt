import React from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../lib/auth';
import InputError from '../forms/InputError';
import * as queries from '../../queries';
import { useMutation } from '@apollo/client';
import Select from '../forms/Select';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

interface Props {}

const validationSchema = Yup.object().shape({
  email: Yup.string().label('Email').email().required(),
  password: Yup.string().label('Password').required(),
  firstName: Yup.string().label('First Name').required(),
  lastName: Yup.string().label('Last Name').required(),
});

const RegisterForm = (props: Props) => {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [newInvitation, { data }] = useMutation(queries.NEW_INVITATION);

  let router = useRouter();

  const handleRedirect = () => {
    setTimeout(() => {
      let jwtToken = Cookies.get('token')
        if (jwtToken) {
          router.push('/')
        }
    }, 500);
  }
  
  const { userSignUp } = useAuth();
  const { signIn } = useAuth();
  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          organisation: '',
          toggle: false,
        }}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);

          console.log(data);

          try {
            await userSignUp(data);
            await signIn(data);
            if (parseInt(data.organisation) !== 0) {
              try {
                await newInvitation({
                  variables: {
                    input: {
                      name: `${data.firstName} ${data.lastName}`,
                      organisationId: parseInt(data.organisation),
                      type: 'membership',
                      email: data.email,
                    },
                  },
                });
              } catch (e) {
                console.log(e);
              }
            }
          } catch (err: any) {
            setErrorMessage(err.graphQLErrors.map((e: any) => e.message));
          }

          setSubmitting(false);
        }}
      >
        {({ isSubmitting, handleSubmit, handleBlur, handleChange }) => (
          <Form
            className='pt-10 flex flex-col w-2/3 mx-8 gap-6'
            onSubmit={handleSubmit}
          >
            <Field
              placeholder='your first name'
              name='firstName'
              type='input'
              as={InputError}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Field
              placeholder='your last name'
              name='lastName'
              type='input'
              as={InputError}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Field
              placeholder='email'
              name='email'
              type='input'
              as={InputError}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Field
              placeholder='Organisation'
              name='organisation'
              as={Select}
              type='select'
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
            {errorMessage && <p>{errorMessage}</p>}
            <button type='submit' disabled={isSubmitting} onClick={() => handleRedirect()}>
              Register Account
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
