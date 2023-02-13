import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import * as queries from '../../../queries';
interface Props {
  open: boolean;
  setOpenDialog: any;
  email: string;
  organisation?: string;
  organisationId?: number;
  invitationId: number;
  memberInvitation?: boolean;
  collab?: boolean;
  denyMutation: any;
  acceptMutation: any;
  campusName?: string;
  refetchQueries: any;
  initiativeId?: number;
  addToTable?: any;
}

const InvitationDialog = ({
  open,
  setOpenDialog,
  email,
  organisation,
  campusName,
  collab,
  organisationId,
  invitationId,
  denyMutation,
  initiativeId,
  memberInvitation,
  acceptMutation,
  refetchQueries,
  addToTable,
}: Props) => {
  const { data: userData, error } = useQuery(queries.GET_USER_BY_EMAIL, {
    variables: {
      email,
    },
  });

  const [addToTableMutation, { error: addToTableError }] =
    useMutation(addToTable);
  const [acceptInvitation, { error: acceptError }] =
    useMutation(acceptMutation);
  const [deleteInvitation, { error: deleteError }] = useMutation(denyMutation, {
    refetchQueries: refetchQueries,
  });

  const handleAcceptCollab = () => {
    try {
      acceptInvitation({
        variables: {
          input: {
            id: initiativeId,
            accepted: true,
          },
        },
      });
      setOpenDialog(false);
      try {
        deleteInvitation({
          variables: {
            id: invitationId,
          },
        });
        try {
          addToTableMutation({
            variables: {
              campusId: organisationId,
              initId: initiativeId,
            },
          });
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccept = () => {
    try {
      acceptInvitation({
        variables: {
          input: {
            id: userData?.user?.id,
            organisationId: organisationId,
            role: 'Member',
          },
        },
      });
      setOpenDialog(false);
      try {
        deleteInvitation({
          variables: {
            id: invitationId,
          },
        });
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Dialog fullWidth open={open} onClose={handleClose}>
        {collab && (
          <>
            <DialogTitle sx={{ fontSize: '1.5rem', mb: '1rem' }}>
              Samenwerking accepteren?
            </DialogTitle>
            <DialogContent>
              <p>
                Bent u zeker dat u deze samenwerking tussen{' '}
                <strong>{organisation}</strong> en <strong>{campusName}</strong>
                wilt accepteren?
              </p>
              <p>
                Als u deze samenwering accepteert, zal dit initiatief
                gepubliceerd worden op de website onder de naam van{' '}
                <strong>{organisation}</strong>
              </p>
              <DialogActions>
                <Button color='success' onClick={handleAcceptCollab}>
                  Accepteer
                </Button>
                <Button color='error' onClick={handleClose}>
                  Annuleer
                </Button>
              </DialogActions>
            </DialogContent>
          </>
        )}
        {memberInvitation && (
          <>
            <DialogTitle>Aanvraag accepteren?</DialogTitle>
            <DialogContent>
              <p>Bent u zeker dat u deze aanvraag wilt accepteren?</p>
              <p>
                Als u deze aanvraag accepteert, zal de gebruiker initiatieven
                kunnen aanmaken in naam van <strong>{organisation}</strong>
              </p>
              <DialogActions>
                <Button color='success' onClick={handleAccept}>
                  Accepteer
                </Button>
                <Button color='error' onClick={handleClose}>
                  Annuleer
                </Button>
              </DialogActions>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};

export default InvitationDialog;
