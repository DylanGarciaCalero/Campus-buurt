import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Naam', width: 180 },
  { field: 'description', headerName: 'Beschrijving', width: 300 },
  { field: 'credits', headerName: 'Studiepunten', width: 150 },
  { field: 'programType', headerName: 'Type', width: 250 },
  { field: 'campusName', headerName: 'Campus', width: 250 },
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
