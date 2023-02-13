import React, { useState } from 'react';
import AdminLayout from '../../../../layouts/AdminLayout';
import * as queries from '../../../../queries';
import { useMutation, useQuery } from '@apollo/client';
import Datagrid from '../../../../component/admin/Datagrid';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import columns from '../../../../dataGridColumns/orgInvitationColumns';
import InvitationDialog from '../../../../component/admin/edit/InvitationDialog';
import { GridCellParams } from '@mui/x-data-grid';

interface Props {}

const Organisations = (props: Props) => {
  const [message, setMessage] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [organisation, setOrganisation] = useState<string>('');
  const [organisationId, setOrganisationId] = useState<number>(0);
  const [invitationId, setInvitationId] = useState<any>(null);
  const [selected, setSelected] = useState<any>(null);

  const [deleteInvitation, { error: deleteInvitationError }] = useMutation(
    queries.DELETE_INVITATION,
    {
      refetchQueries: [queries.INVITATION_TYPE],
    }
  );

  const handleCellClick = (params: GridCellParams) => {
    if (params.field === 'accept') {
      setOpenDialog(true);
      setInvitationId(params.id);
      setSelected(params.row.email);
      setOrganisation(params.row.organisation);
      setOrganisationId(params.row.organisationId);
    } else if (params.field === 'deny') {
      try {
        deleteInvitation({
          variables: {
            id: params.id,
          },
        });
        setMessage(`Invitation from ${params.row.email} has been denied`);
        setOpenSnackbar(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const { loading, error, data } = useQuery(queries.INVITATION_TYPE, {
    variables: {
      type: 'membership',
    },
  });

  let rows;
  if (data && !error && !loading) {
    rows = data.invitationsByType.map((invitation: any) => {
      return {
        id: invitation.id,
        email: invitation.email,
        name: invitation.name,
        organisationId: invitation.organisation?.id,
        organisation: invitation.organisation?.name,
        createdAt: invitation.createdAt,
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
        <Datagrid rows={rows} columns={columns} onCellClick={handleCellClick} />
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity='success' sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      {selected && (
        <InvitationDialog
          setOpenDialog={setOpenDialog}
          open={openDialog}
          memberInvitation
          email={selected}
          organisation={organisation}
          organisationId={organisationId}
          addToTable={queries.ADD_INITIATIVE_TO_CAMPUS}
          invitationId={invitationId}
          denyMutation={queries.DELETE_INVITATION}
          acceptMutation={queries.UPDATE_USER}
          refetchQueries={[queries.INVITATION_TYPE]}
        />
      )}
    </AdminLayout>
  );
};

export default Organisations;
