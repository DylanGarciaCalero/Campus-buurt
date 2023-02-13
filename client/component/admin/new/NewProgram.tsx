import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import * as queries from '../../../queries';
import * as Yup from 'yup';
import { Formik } from 'formik';

interface Props {
  isNew?: any;
  open: boolean;
  setOpen: any;
  mutation?: any;
  query: any;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Program name is required'),
  description: Yup.string().required('Program description is required'),
  credits: Yup.number().required('Program credits is required'),
  programType: Yup.string().required('Program type is required'),
  campusId: Yup.number().required('Program campus is required'),
});

const AddNewDialog = ({ open, mutation, setOpen, query }: Props) => {
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { data: campusData } = useQuery(queries.CAMPUSES);

  const [addNewProgram, { data: addNewData, loading, error }] = useMutation(
    mutation,
    {
      refetchQueries: [query],
    }
  );

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
            Nieuwe opleiding
          </DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                name: '',
                description: '',
                campusId: '',
                programType: '',
                credits: '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);

                console.log(values);

                try {
                  await addNewProgram({
                    variables: {
                      input: {
                        name: values.name,
                        description: values.description,
                        campusId: parseInt(values.campusId),
                        credits: parseInt(values.credits),
                        programType: values.programType,
                      },
                    },
                  });
                  setMessage('Opleiding succesvol toegevoegd');
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

                  <TextField
                    margin='dense'
                    label='Studiepunten'
                    name='credits'
                    type={'number'}
                    value={values.credits}
                    onChange={handleChange}
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                  />

                  {campusData && (
                    <FormControl>
                      <InputLabel id='campus'>Campus</InputLabel>
                      <Select
                        labelId='campus'
                        id='campusId'
                        name='campusId'
                        value={values.campusId}
                        label='Campus'
                        onChange={handleChange}
                      >
                        {campusData?.campuses.map((campus: any) => (
                          <MenuItem key={campus.id} value={campus.id}>
                            {campus.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}

                  <FormControl>
                    <InputLabel id='programType'>Type</InputLabel>
                    <Select
                      labelId='programType'
                      id='programType'
                      name='programType'
                      value={values.programType}
                      label='Type'
                      onChange={handleChange}
                    >
                      <MenuItem value={'Bachelor'}>Bachelor</MenuItem>
                      <MenuItem value={'Graduate'}>Graduate</MenuItem>
                      <MenuItem value={'Post Graduate'}>Post Graduate</MenuItem>
                      <MenuItem value={'Bachelor after Bachelor'}>
                        Bachelor after Bachelor
                      </MenuItem>
                    </Select>
                  </FormControl>

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

export default AddNewDialog;
