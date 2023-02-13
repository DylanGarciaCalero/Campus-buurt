import React, { useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Button, Snackbar } from '@mui/material';
import { useQuery } from '@apollo/client';
import * as queries from '../../../queries';
import NewCategory from '../../../component/admin/new/NewCategory';
import Datagrid from '../../../component/admin/Datagrid';
import categoryColumn from '../../../dataGridColumns/categoryColumns';
import { GridCellParams } from '@mui/x-data-grid';
import UpdateCategory from '../../../component/admin/edit/UpdateCategory';
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

  const { loading, error, data } = useQuery(queries.CATEGORIES);
  let rows;
  if (data && !error && !loading) {
    rows = data.categories.map((category: any) => {
      return {
        id: category.id,
        name: category.name,
        description: category.description,
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
            Nieuwe categorie
          </Button>
          <Datagrid
            rows={rows}
            columns={categoryColumn}
            onCellClick={handleCellClick}
          />
        </>
      )}
      {selected && (
        <UpdateCategory
          id={selected}
          open={open}
          setSelected={setSelected}
          setOpen={setOpen}
          query={queries.GET_CATEGORY}
          mutation={queries.UPDATE_CATEGORY}
          initialValues={initialValues}
        />
      )}
      {isNew && (
        <NewCategory
          open={open}
          setOpen={setOpen}
          isNew={isNew}
          query={queries.CATEGORIES}
          mutation={queries.NEW_CATEGORY}
        />
      )}
      {selectDelete && (
        <DeleteDialog
          setOpenDialog={setOpenDelete}
          open={openDelete}
          id={selectDelete}
          type='Categorie'
          name={name}
          mutation={queries.DELETE_CATEGORY}
          query={queries.CATEGORIES}
        />
      )}
    </AdminLayout>
  );
};

export default Iniviatives;
