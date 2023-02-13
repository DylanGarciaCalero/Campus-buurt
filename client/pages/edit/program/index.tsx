import React, { useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Button, Snackbar } from '@mui/material';
import { useQuery } from '@apollo/client';
import * as queries from '../../../queries';
import Datagrid from '../../../component/admin/Datagrid';
import programColumns from '../../../dataGridColumns/programColumns';
import { GridCellParams } from '@mui/x-data-grid';
import UpdateProgram from '../../../component/admin/edit/UpdateProgram';
import NewProgram from '../../../component/admin/new/NewProgram';
import DeleteDialog from '../../../component/admin/edit/DeleteDialog';

interface Props {}

const Programs = (props: Props) => {
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

  const { loading, error, data } = useQuery(queries.GET_PROGRAMS);
  let rows;
  if (!loading && !error) {
    console.log(data);
    rows = data.educationalPrograms.map((program: any) => {
      return {
        id: program.id,
        name: program.name,
        description: program.description,
        credits: program.credits,
        programType: program.programType,
        campusId: program.campus?.id,
        campusName: program.campus?.name,
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
            Nieuwe opleiding
          </Button>
          <Datagrid
            rows={rows}
            columns={programColumns}
            onCellClick={handleCellClick}
          />
        </>
      )}
      {selected && (
        <UpdateProgram
          id={selected}
          open={open}
          setSelected={setSelected}
          setOpen={setOpen}
          query={queries.GET_PROGRAMS}
          mutation={queries.UPDATE_PROGRAM}
          initialValues={initialValues}
        />
      )}
      {isNew && (
        <NewProgram
          query={queries.GET_PROGRAMS}
          mutation={queries.ADD_NEW_PROGRAM}
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
          type='Opleiding'
          name={name}
          query={queries.GET_PROGRAMS}
          mutation={queries.DELETE_PROGRAM}
        />
      )}
    </AdminLayout>
  );
};

export default Programs;
