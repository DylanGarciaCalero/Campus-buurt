import { Field, Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Footer from '../../../component/Footer';
import * as Yup from 'yup';
import InputError from '../../../component/forms/InputError';
import Select from '../../../component/forms/Select';
import Header from '../../../component/Header';
import Redirect from '../../../component/Redirect';
import ProfileLayout from '../../../layouts/ProfileLayout';
import { CgOrganisation } from 'react-icons/cg'
import React, { useRef } from 'react';
import dynamic from 'next/dynamic';

const validationSchema = Yup.object().shape({
  email: Yup.string().label('Email').email().required(),
  password: Yup.string().label('Password').required(),
  firstName: Yup.string().label('First Name').required(),
  lastName: Yup.string().label('Last Name').required(),
});


const RegisterOrganisation: NextPage = () => {

  const MapWithNoSSR = dynamic(
    () => import('../../../component/organisation/RegisterMap'), // replace '@components/map' with your component's location
    {
      loading: () => <p>A map is loading</p>,
      ssr: false, // This line is important. It's what prevents server-side render
    }
  );

  const [errorMessage, setErrorMessage] = React.useState('');

  const handleRedirect = () => {
    setTimeout(() => {
      let jwtToken = Cookies.get('token')
        if (jwtToken) {
          router.push('/')
        }
    }, 500);
  }

  const router = useRouter()
  let jwtToken = Cookies.get('token');
  if (jwtToken) {
    router.push('/');
  }

  const fileRef = useRef(null)

  return (
    <>
      {jwtToken ?
      <Redirect message={'you are already logged in'} path={'/'}/>
      :
        <ProfileLayout>
          <Header/>
          <div className='h-full bg-secondary mb-2 flex flex-row border-4 border-white'>
            
            <div className='w-1/2'>
            <div className='flex flex-row items-center text-primary p-4 px-8'>
              <CgOrganisation className='w-6 h-6'/>
              <h1 className='p-4 text-lg'>Create an organisation</h1>
            </div>
            <Formik
                validationSchema={validationSchema}
                initialValues={{
                  email: '',
                  password: '',
                  orgName: '',
                  description: '',
                  adress: '',
                  file: null
                }}
                onSubmit={async (data, { setSubmitting }) => {
                  setSubmitting(true);
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting, handleSubmit, handleBlur, handleChange, setFieldValue, setSubmitting }) => (
                  <Form
                    className='pt-10 flex flex-col w-2/3 mx-8 gap-6'
                    onSubmit={handleSubmit}
                  >
                    <Field
                      placeholder='your organisation name'
                      name='orgName'
                      type='input'
                      as={InputError}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <Field
                      placeholder='your organisation description'
                      name='description'
                      type='input'
                      as={InputError}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <Field
                      placeholder='your organisation address'
                      name='adress'
                      type='input'
                      as={InputError}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <h3>Your logo:</h3>
                    <Field
                      placeholder='please enter your logo image'
                      name='file'
                      type='file'
                      as={InputError}
                      onBlur={handleBlur}
                      onChange={(event:any) => {
                        setFieldValue("file", event.target.files[0]);
                      }}
                    />
                    <Field
                      placeholder='set an email'
                      name='email'
                      type='input'
                      as={InputError}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    <Field
                      placeholder='set a password'
                      name='password'
                      type='password'
                      as={InputError}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {errorMessage && <p>{errorMessage}</p>}
                    <button className='bg-primary p-2' type='submit' disabled={isSubmitting} onClick={() => handleRedirect()}>
                      Register Organisation
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className='w-1/2 z-0 border-l-4 border-l-white'>
              <MapWithNoSSR/>
            </div>
          </div>
          <Footer/>
        </ProfileLayout>
      }
    </>
  );
};

export default RegisterOrganisation;
