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
  MenuItem,
  Select,
} from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import * as Yup from 'yup';
import * as queries from '../../../queries';
import { Formik } from 'formik';
import AdapterDayJs from '@mui/lab/AdapterDayjs';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

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
  let campusArray = initialValues?.campusArray;
  const [dateValue, setDateValue] = useState<Date | null>(initialValues?.date);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [updateValues, { loading: updateValuesLoading }] = useMutation(
    mutation,
    {
      refetchQueries: [query],
    }
  );
  const { data: categoryData } = useQuery(queries.CATEGORIES);
  const { data: campusData } = useQuery(queries.CAMPUSES);
  const { data } = useQuery(query, {
    variables: { id },
  });

  const handleClose = () => {
    setSelected(null);
    setOpen(false);
  };

  const handleDatePick = (newValue: Date | null) => {
    setDateValue(newValue);
  };

  const handleCampusChange = (e: any) => {
    console.log(e.target.value);
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
              Update Initiatief
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
                          name: values.name,
                          description: values.description,
                          categoryId: values.categoryId,
                          date: dateValue,
                        },
                      },
                    });
                    setOpen(false);
                    setMessage(`Initiative ${id} updated`);
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
                    <LocalizationProvider dateAdapter={AdapterDayJs}>
                      <DesktopDatePicker
                        inputFormat='DD/MM/YYYY'
                        label='Datum'
                        value={dateValue}
                        onChange={handleDatePick}
                        renderInput={(params) => (
                          <TextField {...params} name='date' />
                        )}
                      />
                    </LocalizationProvider>
                    <FormControl>
                      <InputLabel id='category'>Categorie</InputLabel>
                      <Select
                        labelId='category'
                        id='categoryId'
                        name='categoryId'
                        value={values.categoryId ?? values.category}
                        label='Categorie'
                        onChange={handleChange}
                      >
                        {categoryData?.categories.map((category: any) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {/* <FormControl>
                      <InputLabel id='campus'>Campussen</InputLabel>
                      <Select
                        labelId='campus'
                        id='campusId'
                        label='Campussen'
                        name='campusId'
                        onChange={handleCampusChange}
                        value={`${campusArray.join(',')}`}
                      >
                        {campusData?.campuses.map((campus: any) => (
                          <MenuItem key={campus.id} value={campus.id}>
                            {campus.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl> */}
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
