import React, { useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Button, Snackbar } from '@mui/material';
import { useQuery } from '@apollo/client';
import * as queries from '../../../queries';
import Datagrid from '../../../component/admin/Datagrid';
import organisationColumns from '../../../dataGridColumns/organisationColumns';
import { GridCellParams } from '@mui/x-data-grid';
import UpdateOrganisation from '../../../component/admin/edit/UpdateOrganisation';
import NewOrganisation from '../../../component/admin/new/NewOrganisation';
import DeleteDialog from '../../../component/admin/edit/DeleteDialog';

interface Props {}

const Organisations = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [initialValues, setInitialValues] = useState<any>(null);
  const [isNew, setIsNew] = useState<any>(false);
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

  const { loading, error, data } = useQuery(queries.ORGANISATIONS);
  let rows;
  if (!loading && !error) {
    console.log(data);
    rows = data.organisations.map((org: any) => {
      return {
        id: org.id,
        name: org.name,
        description: org.description,
        address: org.address,
        phone: org.phone,
        email: org.email,
        website: org.website,
        longitude: org.longitude,
        latitude: org.latitude,
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
            Nieuwe organisatie
          </Button>
          <Datagrid
            rows={rows}
            columns={organisationColumns}
            onCellClick={handleCellClick}
          />
        </>
      )}
      {selected && (
        <UpdateOrganisation
          id={selected}
          open={open}
          setSelected={setSelected}
          setOpen={setOpen}
          query={queries.ORGANISATIONS}
          mutation={queries.UPDATE_ORGANISATION}
          initialValues={initialValues}
        />
      )}
      {isNew && (
        <NewOrganisation
          query={queries.ORGANISATIONS}
          mutation={queries.CREATE_ORGANISATION}
          open={open}
          isNew={isNew}
          setOpen={setOpen}
        />
      )}
      {selectDelete && (
        <DeleteDialog
          setOpenDialog={setOpenDelete}
          open={openDelete}
          id={selectDelete}
          type='Organisatie'
          name={name}
          query={queries.ORGANISATIONS}
          mutation={queries.DELETE_ORGANISATION}
        />
      )}
    </AdminLayout>
  );
};

export default Organisations;
