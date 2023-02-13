import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import * as Yup from 'yup';
import { Formik } from 'formik';

interface Props {
  id?: number;
  open: boolean;
  setSelected: any;
  setOpen: any;
  query: any;
  initialValues?: any;
  mutation?: any;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Campus name is required'),
  description: Yup.string().required('Campus description is required'),
  address: Yup.string().required('Campus address is required'),
  phone: Yup.string().required('Campus phone is required'),
  longitude: Yup.number().required('Campus longitude is required'),
  latitude: Yup.number().required('Campus latitude is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Campus email is required'),
  website: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
    )
    .required('Please enter website'),
});

const UpdateDialog = ({
  id,
  open,
  mutation,
  setSelected,
  setOpen,
  query,
  initialValues,
}: Props) => {
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [updateValues, { loading: updateValuesLoading }] = useMutation(
    mutation,
    {
      refetchQueries: [query],
    }
  );

  const { data } = useQuery(query, {
    variables: { id },
  });

  const handleClose = () => {
    setSelected(null);
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
        {data && (
          <>
            <DialogTitle sx={{ mb: '1rem', fontSize: '1.5rem' }}>
              Update {data.campus.name}
            </DialogTitle>
            <DialogContent>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);

                  try {
                    await updateValues({
                      variables: {
                        id,
                        input: {
                          name: values.name,
                          description: values.description,
                          address: values.address,
                          phone: values.phone,
                          longitude: parseFloat(values.longitude),
                          latitude: parseFloat(values.latitude),
                          email: values.email,
                          website: values.website,
                        },
                      },
                    });
                    setOpen(false);
                    setMessage(`Campus ${id} updated`);
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
                      label='Adres'
                      name='address'
                      value={values.address}
                      onChange={handleChange}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
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
                    <TextField
                      margin='dense'
                      label='Website'
                      name='website'
                      value={values.website}
                      onChange={handleChange}
                      error={Boolean(touched.website && errors.website)}
                      helperText={touched.website && errors.website}
                    />
                    <TextField
                      margin='dense'
                      label='Email'
                      name='email'
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <TextField
                      margin='dense'
                      label='Telefoon'
                      name='phone'
                      value={values.phone}
                      onChange={handleChange}
                      error={Boolean(touched.phone && errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                    <div className='flex justify-between'>
                      <TextField
                        margin='dense'
                        label='Latitude'
                        name='latitude'
                        value={values.latitude}
                        onChange={handleChange}
                        error={Boolean(touched.latitude && errors.latitude)}
                        helperText={touched.latitude && errors.latitude}
                      />
                      <TextField
                        margin='dense'
                        label='Longitude'
                        name='longitude'
                        value={values.longitude}
                        onChange={handleChange}
                        error={Boolean(touched.longitude && errors.longitude)}
                        helperText={touched.longitude && errors.longitude}
                      />
                    </div>
                    <Button
                      type='submit'
                      variant='outlined'
                      size='large'
                      color='success'
                      disabled={isSubmitting}
                    >
                      Update
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
        )}
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

export default UpdateDialog;
