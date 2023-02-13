import React, { useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Snackbar, Button } from '@mui/material';
import { useQuery } from '@apollo/client';
import NewCampus from '../../../component/admin/new/NewCampus';
import UpdateCampus from '../../../component/admin/edit/UpdateCampus';
import * as queries from '../../../queries';
import Datagrid from '../../../component/admin/Datagrid';
import columns from '../../../dataGridColumns/campusColumns';
import { GridCellParams } from '@mui/x-data-grid';
import DeleteDialog from '../../../component/admin/edit/DeleteDialog';

interface Props {}

const Campuses = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [isNew, setIsNew] = useState<any>(false);
  const [initialValues, setInitialValues] = useState<any>(null);
  const [selectDelete, setSelectDelete] = useState<any>(null);
  const [openDelete, setOpenDelete] = useState<any>(false);
  const [name, setName] = useState<string>('');

  const handleCellClick = (params: GridCellParams) => {
    if (params.field === 'actions') {
      setSelected(params.id);
      setInitialValues(params.row);
      setOpen(true);
    } else if (params.field === 'delete') {
      setName(params.row.name);
      setSelectDelete(params.id);
      setOpenDelete(true);
    }
  };

  const handleNewClick = () => {
    setOpen(true);
    setIsNew(true);
  };

  const { data, error, loading } = useQuery(queries.CAMPUSES, {
    ssr: true,
  });

  let rows;
  if (data && !error && !loading) {
    rows = data.campuses.map((campus: any) => {
      return {
        id: campus.id,
        name: campus.name,
        description: campus.description,
        address: campus.address,
        phone: campus.phone,
        latitude: campus.latitude,
        longitude: campus.longitude,
        email: campus.email,
        website: campus.website,
      };
    });
  }

  return (
    <AdminLayout>
      {error && <div>Error! {error.message}</div>}
      {error && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={true}
          autoHideDuration={4000}
        >
          <Alert severity='error'>An error occured: {error.message}</Alert>
        </Snackbar>
      )}
      {loading && <CircularProgress sx={{ display: 'flex' }} />}
      {data && !error && (
        <>
          <Button variant='outlined' onClick={handleNewClick}>
            Nieuwe campus
          </Button>
          <Datagrid
            rows={rows}
            columns={columns}
            onCellClick={handleCellClick}
          />
        </>
      )}
      {selected && (
        <UpdateCampus
          id={selected}
          open={open}
          setSelected={setSelected}
          setOpen={setOpen}
          query={queries.GET_CAMPUS}
          mutation={queries.UPDATE_CAMPUS}
          initialValues={initialValues}
        />
      )}
      {isNew && (
        <NewCampus
          isNew={isNew}
          open={open}
          setOpen={setOpen}
          query={queries.CAMPUSES}
          mutation={queries.ADD_NEW_CAMPUS}
        />
      )}
      {selectDelete && (
        <DeleteDialog
          setOpenDialog={setOpenDelete}
          open={openDelete}
          id={selectDelete}
          type='Campus'
          name={name}
          mutation={queries.DELETE_CAMPUS}
          query={queries.CAMPUSES}
        />
      )}
    </AdminLayout>
  );
};

export default Campuses;
