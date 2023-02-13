import React, { useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Button, Snackbar } from '@mui/material';
import { useQuery } from '@apollo/client';
import * as queries from '../../../queries';
import Datagrid from '../../../component/admin/Datagrid';
import NewInitiative from '../../../component/admin/new/NewInitiative';
import initiativeColumns from '../../../dataGridColumns/InitiativeColumns';
import { GridCellParams } from '@mui/x-data-grid';
import UpdateInitiative from '../../../component/admin/edit/UpdateInitiative';
import DeleteDialog from '../../../component/admin/edit/DeleteDialog';

interface Props {}

const Iniviatives = (props: Props) => {
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

  const { loading, error, data } = useQuery(queries.INITIATIVES);

  let rows;
  if (!loading && !error) {
    rows = data.initiativesAccepted.map((initiative: any) => {
      const date = new Date(initiative.date);
      const formattedDate =
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

      return {
        id: initiative.id,
        name: initiative.name,
        description: initiative.description,
        date: initiative.date,
        formattedDate: formattedDate,
        organisation: initiative.organisation?.name,
        campusArray: initiative.campuses?.map((campus: any) => campus.id),
        campuses: initiative.campuses
          .map((campus: any) => campus.name)
          .join(', '),
        category: initiative.category?.name,
        categoryId: initiative.category?.id,
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
            Nieuw initiatief
          </Button>
          <Datagrid
            rows={rows}
            columns={initiativeColumns}
            onCellClick={handleCellClick}
          />
        </>
      )}
      {selected && (
        <UpdateInitiative
          id={selected}
          open={open}
          setSelected={setSelected}
          setOpen={setOpen}
          query={queries.INITIATIVES}
          mutation={queries.UPDATE_INITIATIVE}
          initialValues={initialValues}
        />
      )}
      {isNew && (
        <NewInitiative
          open={open}
          setOpen={setOpen}
          mutation={queries.CREATE_INITIATIVE}
          query={queries.INITIATIVES}
          isNew={isNew}
        />
      )}
      {selectDelete && (
        <DeleteDialog
          setOpenDialog={setOpenDelete}
          open={openDelete}
          id={selectDelete}
          type='Initiatief'
          name={name}
          mutation={queries.DELETE_INITIATIVE}
          query={queries.INITIATIVES}
        />
      )}
    </AdminLayout>
  );
};

export default Iniviatives;
