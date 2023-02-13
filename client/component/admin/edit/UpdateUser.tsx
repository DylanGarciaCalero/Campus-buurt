import { useMutation, useQuery } from '@apollo/client';
import {
  Alert,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from '@mui/material';
import { Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';

interface Props {
  id?: number;
  open: boolean;
  setSelected: any;
  setOpen: any;
  query: any;
  initialValues?: any;
  mutation?: any;
}

enum Role {
  Admin = 'Admin',
  User = 'User',
  Member = 'Member',
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const UpdateUser = ({
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

  const handleClose = () => {
    setSelected(null);
    setOpen(false);
  };

  const { data } = useQuery(query, {
    variables: { id },
  });

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
              Update User
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
                        input: {
                          id,
                          firstName: values.firstName,
                          lastName: values.lastName,
                          email: values.email,
                          role: values.role,
                        },
                      },
                    });
                    setOpen(false);
                    setMessage(`User ${values.id} updated successfully`);
                    setOpenSnackbar(true);
                  } catch (error) {
                    console.log(error);
                  }

                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  errors,
                }) => (
                  <form className='grid gap-y-6' onSubmit={handleSubmit}>
                    <TextField
                      className='mt-2'
                      label='Voornaam'
                      name='firstName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                    <TextField
                      label='Achternaam'
                      name='lastName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                    <TextField
                      label='Email'
                      name='email'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <FormControl>
                      <InputLabel id='user'>Rol</InputLabel>
                      <Select
                        labelId='role'
                        id='role'
                        name='role'
                        label='Rol'
                        value={values.role}
                        error={Boolean(touched.user && errors.user)}
                        onChange={handleChange}
                      >
                        <MenuItem value={Role.Member}>Member</MenuItem>
                        <MenuItem value={Role.Admin}>Admin</MenuItem>
                      </Select>
                    </FormControl>
                    <Button
                      type='submit'
                      variant='outlined'
                      color='success'
                      size='large'
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

export default UpdateUser;
