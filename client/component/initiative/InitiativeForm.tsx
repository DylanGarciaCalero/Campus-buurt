import React, { useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import InputError from '../forms/InputError';
import * as queries from '../../queries';
import { useMutation, useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { MdExtension } from 'react-icons/md'
import { useRouter } from 'next/router';

interface Props {}

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
interface Category {
  id: number;
  name: string;
}
interface CategoryData {
  categories: Category[]
}

const validationSchema = Yup.object().shape({
  name: Yup.string().label('initiative name').required(),
  description: Yup.string().label('description').required()
});

const InitiativeForm = (props: Props) => {
  const [errorMessage, setErrorMessage] = React.useState('');
  const [userId, setUserId] = React.useState(0);
  const [ value, setValue ] = React.useState(0);
  const [addInitiative, { data, loading, error }] = useMutation(queries.CREATE_INITIATIVE);
  const userInformation = useQuery<UserInfo>(queries.GET_USER, {
    variables: {
        id: userId
    }
  });

  const categories = useQuery<CategoryData>(queries.CATEGORIES);

  const router = useRouter()

  let jwtToken = Cookies.get('token')
    useEffect(() => {
        if (jwtToken) {
          let decoded: Token = jwtDecode(jwtToken);
          console.log(decoded)
          setUserId(decoded.sub);
        }
      }, [jwtToken]);

  return (
    <div className='w-7xl m-auto bg-white mb-2'>
      <div className='p-4 text-blue flex flex-row items-center gap-2'>
        <MdExtension className='w-8 h-8'/>
        <h1>Creëer een nieuw initiatief!</h1>
      </div>
      
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: '',
          description: '',
          category: '',
        }}
        onSubmit={async (data, { setSubmitting }) => {
          setSubmitting(true);
          console.log(data)
          if (value !== 0) {
            addInitiative(
              {
                variables: {
                  input: {
                    name: data.name,
                    description: data.description,
                    date: Date.now(),
                    organisationId: userInformation.data?.userById.organisation.id,
                    accepted: false,
                    categoryId: value
                  }
                }
              }
            )
          } else {
            addInitiative(
              {
                variables: {
                  input: {
                    name: data.name,
                    description: data.description,
                    date: Date.now(),
                    organisationId: userInformation.data?.userById.organisation.id,
                    accepted: false,
                    categoryId: null,
                  }
                }
              }
            )
          }
          setSubmitting(false);
          router.push('/organisation/initiatives');
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
            
            <Field as="select" name="category">
              <option key={0}>Choose a category</option>
              {
                categories.data ?
                categories.data.categories.map((category: Category) => {
                  return (
                      <>
                        <option key={category.id} value={category.id} onClick={() => setValue(category.id)}>{category.name}</option>
                      </>
                  )
                }) : ''
              }
            </Field>
            {errorMessage && <p>{errorMessage}</p>}
            <button className='w-fit bg-primary p-2 mb-2 hover:bg-secondary' type='submit' disabled={isSubmitting}>
              Create initiative
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default InitiativeForm;
