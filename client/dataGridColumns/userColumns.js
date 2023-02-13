import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'Voornaam', width: 180 },
  { field: 'lastName', headerName: 'Achternaam', width: 250 },
  { field: 'email', headerName: 'Email Adres', width: 180 },
  { field: 'role', headerName: 'Rol', width: 120 },
  { field: 'organisation', headerName: 'Organisatie', width: 180 },
  {
    field: 'actions',
    headerName: 'Pas aan',
    width: 120,
    renderCell: (cellValues) => {
      return (
        <Button>
          <EditIcon />
        </Button>
      );
    },
  },
  {
    field: 'delete',
    headerName: 'Verwijder',
    width: 120,
    renderCell: (cellValues) => {
      return (
        <Button>
          <DeleteIcon />
        </Button>
      );
    },
  },
];

export default columns;
