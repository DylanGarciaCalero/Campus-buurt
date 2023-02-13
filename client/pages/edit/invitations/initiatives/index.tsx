import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import AdminLayout from '../../../../layouts/AdminLayout';
import * as queries from '../../../../queries';
import Datagrid from '../../../../component/admin/Datagrid';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import columns from '../../../../dataGridColumns/collabInvitationColumns';
import InvitationDialog from '../../../../component/admin/edit/InvitationDialog';
import { GridCellParams } from '@mui/x-data-grid';

interface Props {}

const Initiatives = (props: Props) => {
  const [message, setMessage] = useState<string>('');
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [organisation, setOrganisation] = useState<string>('');
  const [organisationId, setOrganisationId] = useState<number>(0);
  const [initiativeId, setInitiativeId] = useState<number>(0);
  const [invitationId, setInvitationId] = useState<any>(null);
  const [campusName, setCampusName] = useState<string>('');
  const [selected, setSelected] = useState<any>(null);

  const { data, loading, error } = useQuery(queries.COLLAB_INVITES);
  const [deleteCollabInvite, { data: deleteData }] = useMutation(
    queries.DELETE_COLLAB_INVITE,
    {
      refetchQueries: [queries.COLLAB_INVITES],
    }
  );

  const handleCellClick = (params: GridCellParams) => {
    if (params.field === 'accept') {
      setOpenDialog(true);
      setInvitationId(params.id);
      setSelected(params.row.name);
      setOrganisation(params.row.organisation);
      setInitiativeId(params.row.initiativeId);
      setCampusName(params.row.campus);
      setOrganisationId(params.row.campusId);
    } else if (params.field === 'deny') {
      deleteCollabInvite({
        variables: {
          id: params.id,
        },
      });
    }
  };

  let rows;
  if (data && !error && !loading) {
    rows = data.collabInvites.map((collabInvite: any) => {
      const date = new Date(collabInvite.initiative.date);
      const formattedDate =
        date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

      return {
        id: collabInvite.id,
        name: collabInvite.initiative.name,
        initiativeId: collabInvite.initiative?.id,
        organisation: collabInvite.initiative?.organisation?.name,
        description: collabInvite.initiative?.description,
        date: formattedDate,
        campus: collabInvite.campus?.name,
        campusId: collabInvite.campus?.id,
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
          collab
          setOpenDialog={setOpenDialog}
          open={openDialog}
          email={selected}
          organisation={organisation}
          organisationId={organisationId}
          invitationId={invitationId}
          denyMutation={queries.DELETE_COLLAB_INVITE}
          acceptMutation={queries.ACCEPT_COLLAB_INVITE}
          addToTable={queries.ADD_INITIATIVE_TO_CAMPUS}
          refetchQueries={[queries.COLLAB_INVITES]}
          initiativeId={initiativeId}
          campusName={campusName}
        />
      )}
    </AdminLayout>
  );
};

export default Initiatives;
