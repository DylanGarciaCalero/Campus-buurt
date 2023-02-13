import { useMutation } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React from 'react';

type Props = {
  open: boolean;
  setOpenDialog: any;
  type: string;
  name: string;
  mutation: any;
  id: number;
  query: any;
};

const DeleteDialog = ({
  open,
  setOpenDialog,
  type,
  name,
  mutation,
  id,
  query,
}: Props) => {
  const [deleteMutation, { loading, error }] = useMutation(mutation, {
    refetchQueries: [query],
  });

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleAccept = () => {
    try {
      deleteMutation({
        variables: {
          id: id,
        },
      });
      setOpenDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <DialogTitle sx={{ fontSize: '1.5rem' }}>Verwijderen?</DialogTitle>
      <DialogContent>
        <p>Bent u zeker dat u dit item wilt verwijderen?</p>
        <p>
          {type}: <strong>{name}</strong>{' '}
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
    </Dialog>
  );
};

export default DeleteDialog;
