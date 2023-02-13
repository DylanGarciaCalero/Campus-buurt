import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert, Snackbar } from '@mui/material';
import AdminLayout from '../../../../layouts/AdminLayout';
import Datagrid from '../../../../component/admin/Datagrid';
import * as queries from '../../../../queries';
import userColumns from '../../../../dataGridColumns/userColumns';
import { GridCellParams } from '@mui/x-data-grid';
import UpdateUser from '../../../../component/admin/edit/UpdateUser';

interface Props {}

const Users = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [initialValues, setInitialValues] = useState<any>(null);

  const handleCellClick = (params: GridCellParams) => {
    setSelected(params.id);
    setInitialValues(params.row);
    setOpen(true);
  };

  const { loading, error, data } = useQuery(queries.ADMINS);
  let rows;
  if (!loading && !error) {
    rows = data.admins.map((user: any) => {
      let noOrg = 'No Organisation';

      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        organisation:
          user.organisation?.name === undefined
            ? noOrg
            : user.organisation?.name,
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
        <Datagrid
          onCellClick={handleCellClick}
          rows={rows}
          columns={userColumns}
        />
      )}
      {selected && (
        <UpdateUser
          id={selected}
          open={open}
          setSelected={setSelected}
          setOpen={setOpen}
          query={queries.ADMINS}
          mutation={queries.UPDATE_USER}
          initialValues={initialValues}
        />
      )}
    </AdminLayout>
  );
};

export default Users;
