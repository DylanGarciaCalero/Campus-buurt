import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Snackbar,
  Alert,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useMutation, useQuery } from '@apollo/client';
import * as queries from '../../../queries';
import * as Yup from 'yup';
import { Formik } from 'formik';
import AdapterDayJs from '@mui/lab/AdapterDayjs';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

interface Props {
  isNew?: any;
  open: boolean;
  setOpen: any;
  mutation?: any;
  query: any;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Initiative name is required'),
  description: Yup.string().required('Initiative description is required'),
  date: Yup.date().required('Initiative date is required'),
  categoryId: Yup.number().required('Initiative category is required'),
  campusId: Yup.number().required('Initiative campus is required'),
});

const AddNewDialog = ({ open, mutation, setOpen, query }: Props) => {
  const [message, setMessage] = useState('');
  const [dateValue, setDateValue] = useState<Date | null>(new Date());
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [newInitiativeId, setNewInitiativeId] = useState<number>(0);
  const [newCampusId, setNewCampusId] = useState<number>(1);

  const { data: categoryData } = useQuery(queries.CATEGORIES);
  const { data: campusData } = useQuery(queries.CAMPUSES);
  const { data: orgData } = useQuery(queries.ORGANISATIONS);

  const [addNewInitiative, { data: addNewData, loading, error }] = useMutation(
    mutation,
    {
      onCompleted: (data) => {
        console.log('data', data);
        addInitiativeToCampus({
          variables: {
            campusId: newCampusId,
            initId: data.createInitiative.id,
          },
        });
      },
    }
  );

  const [addInitiativeToCampus, { data }] = useMutation(
    queries.ADD_INITIATIVE_TO_CAMPUS,
    {
      refetchQueries: [query],
    }
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleDatePick = (newValue: Date | null) => {
    setDateValue(newValue);
  };

  const handleCampusChange = (newValue: any | null) => {
    setNewCampusId(newValue.target.value);
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
            Nieuw initiatief
          </DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                name: '',
                description: '',
                categoryId: '',
                date: dateValue,
                campusId: newCampusId,
                organisationId: '',
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);

                try {
                  await addNewInitiative({
                    variables: {
                      input: {
                        name: values.name,
                        description: values.description,
                        date: values.date,
                        categoryId: parseInt(values.categoryId),
                        campusId: newCampusId,
                        organisationId: parseInt(values.organisationId),
                        accepted: true,
                      },
                    },
                  });
                  setMessage('Initiatief succesvol toegevoegd');
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
                      value={values.categoryId}
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

                  <FormControl>
                    <InputLabel id='category'>Organisatie</InputLabel>
                    <Select
                      labelId='organisation'
                      id='organisationId'
                      name='organisationId'
                      value={values.organisationId}
                      label='Organisatie'
                      onChange={handleChange}
                    >
                      {orgData?.organisations.map((orgData: any) => (
                        <MenuItem key={orgData.id} value={orgData.id}>
                          {orgData.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {campusData && (
                    <FormControl>
                      <InputLabel id='campus'>Campus</InputLabel>
                      <Select
                        labelId='campus'
                        id='campusId'
                        label='Campus'
                        name='campusId'
                        onChange={handleCampusChange}
                        value={newCampusId}
                      >
                        {campusData?.campuses.map((campus: any) => (
                          <MenuItem key={campus.id} value={campus.id}>
                            {campus.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
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
