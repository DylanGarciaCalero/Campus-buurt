import React, { useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import InputError from '../forms/InputError';
import * as queries from '../../queries';
import { useMutation, useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { MdExtension } from 'react-icons/md'

interface Props {
    id: number,
    name: string,
}

interface Token {
  sub: number;
}

interface Organisation {
 id: number;
}
interface UserData {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  organisation: Organisation,
  role: string;
}

interface UserInfo {
  userById: UserData
}

const validationSchema = Yup.object().shape({
  name: Yup.string().label('initiative name').required(),
  description: Yup.string().label('description').required()
});


const removeInitiative = (id:number) => {

}

const EditInitiativeForm = (props: Props) => {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [editInitiative, {data, loading, error}] = useMutation(queries.UPDATE_INITIATIVE);

  return (
    <div className='w-full m-auto bg-secondary mb-2 flex flex-col items-center justify-center'>
      <div className='p-4 text-blue flex flex-row items-center gap-2'>
        <MdExtension className='w-8 h-8'/>
        <h1>Edit initiatief: {props.name}</h1>
      </div>
      
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: '',
          description: '',
          id: 0,
        }}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          data.id = props.id;
          if (data) {
              editInitiative({
                  variables: {
                      input: data
                  }
              })
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
              placeholder='Initiative name'
              name='name'
              type='input'
              as={InputError}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <Field
              placeholder='Description'
              name='description'
              type='textarea'
              as={InputError}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errorMessage && <p>{errorMessage}</p>}
            <div className='flex flex-row justify-between'>
                <button className='w-fit bg-primary p-2 mb-2 hover:bg-white' type='submit' disabled={isSubmitting}>
                Edit initiative
                </button>
                <div className='text-red cursor-pointer' onClick={() => removeInitiative(props.id)}>
                    <p>Verwijder initiatief</p>
                </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditInitiativeForm;
