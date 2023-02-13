import { useFormik } from "formik";
import { Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import React from "react";
import { FormStyle } from "../component/styles/Form.style.js"
import { LabelStyle } from "../component/styles/Label.style.js"
import { InputField } from "../component/styles/InputField.style.js"
import InputError from './forms/InputError';
import * as queries from '../queries';
import { useQuery } from "@apollo/client";

interface Props {}

interface Category {
  id: number;
  name: string;
}
interface CategoryData {
  categories: Category[]
}

const validationSchema = Yup.object().shape({
  name: Yup.string().label('Name').max(35),
  organisation: Yup.string().label('Organisation').max(35),
  category: Yup.string().label('Category').max(35),
})

const Filter = (props: Props) => {
    const [ errorMessage, setErrorMessage] = React.useState<string>('');
    const [ value, setValue ] = React.useState<number>(0)

    const { loading, error, data } = useQuery<CategoryData>(queries.CATEGORIES);
    if (error) return <p>Error: {error.message}</p>;

    const params = new URLSearchParams;

      return (
          <>
          <div className="bg-primary m-2 p-2">
            <h2 className="text-white">Filter</h2>
          </div>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ name: '', organisation: '', category: ''}}
            onSubmit={async (data, { setSubmitting }) => {
              setSubmitting(true)
              setSubmitting(false)
            }}
          >

{({ isSubmitting, handleSubmit, handleBlur, handleChange }) => (
          <Form className='pt-10 flex flex-col mx-8 gap-6' onSubmit={handleSubmit}>
            <FormStyle>
            <LabelStyle>
              Initiatiefnaam
            </LabelStyle>
            <Field
              placeholder='name'
              name='name'
              type='input'
              as={InputError}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <LabelStyle>
              Organisatienaam
            </LabelStyle>
            <Field
              placeholder='organisation'
              name='organisation'
              type='input'
              as={InputError}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <LabelStyle>
              Categorie
            </LabelStyle>
            <Field
              as="select"
              name='category'
              type='input'
              onBlur={handleBlur}
              onChange={handleChange}
            >
              <option value="0" hidden>Choose a category</option>
              {!loading &&
              data &&
              data.categories.map((category: Category) => {
                return (
                  <option key={category.id} value={category.name} onClick={() => setValue(category.id)}>{category.name}</option>
                );
              })}
            </Field>
            {errorMessage && <p>{errorMessage}</p>}
            <button className="bg-primary mt-2 p-1 text-white" type='submit' disabled={isSubmitting}>
              Search
            </button>
            </FormStyle>
          </Form>
        )}
          </Formik>
          </>
      );
};

export default Filter