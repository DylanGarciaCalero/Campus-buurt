import React, { useState } from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';

type Props = {
  isNew?: any;
  open: boolean;
  setOpen: any;
  mutation?: any;
  query: any;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Category name is required'),
  description: Yup.string().required('Category description is required'),
});

const NewCategory = ({ open, setOpen, mutation, query }: Props) => {
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [addNewCategory, { data, loading, error }] = useMutation(mutation, {
    refetchQueries: [query],
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = (
    e: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <>
          <DialogTitle sx={{ mb: '1rem', fontSize: '1.5rem' }}>
            Nieuwe categorie
          </DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                name: '',
                description: '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);

                console.log(values);

                try {
                  await addNewCategory({
                    variables: {
                      input: {
                        name: values.name,
                        description: values.description,
                      },
                    },
                  });
                  setMessage('Category succesvol toegevoegd');
                  setOpen(false);
                  setOpenSnackbar(true);
                } catch (error) {
                  console.log(error);
                }

                setSubmitting(false);
              }}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                errors,
              }) => (
                <form className='grid gap-y-6' onSubmit={handleSubmit}>
                  <TextField
                    margin='dense'
                    label='Naam'
                    name='name'
                    value={values.name}
                    onChange={handleChange}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    margin='dense'
                    label='Omschrijving'
                    name='description'
                    value={values.description}
                    onChange={handleChange}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />
                  <Button
                    type='submit'
                    variant='outlined'
                    size='large'
                    color='success'
                    disabled={isSubmitting}
                  >
                    Bevestig
                  </Button>
                  <Button
                    onClick={handleClose}
                    variant='outlined'
                    size='large'
                    color='error'
                  >
                    Cancel
                  </Button>
                </form>
              )}
            </Formik>
          </DialogContent>
        </>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert severity='success' sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NewCategory;
