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

const UpdateDialog = ({
  id,
  open,
  mutation,
  setSelected,
  setOpen,
  query,
  initialValues,
}: Props) => {
  const [message, setMessage] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
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
              Update {data.category.name}
            </DialogTitle>
            <DialogContent>
              <Formik
                initialValues={initialValues}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);

                  try {
                    await updateValues({
                      variables: {
                        id,
                        input: {
                          name: values.name,
                          description: values.description,
                        },
                      },
                    });
                    setOpen(false);
                    setMessage(`Category ${id} updated successfully`);
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
