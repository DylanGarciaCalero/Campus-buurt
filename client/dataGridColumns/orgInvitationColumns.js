import { Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Naam', width: 180 },
  { field: 'email', headerName: 'Email', width: 270 },
  { field: 'organisation', headerName: 'Organisatie', width: 180 },
  {
    field: 'accept',
    headerName: 'Aanvaard',
    width: 100,
    renderCell: (cellValues) => {
      return (
        <Button color='success'>
          <CheckIcon color='success' />
        </Button>
      );
    },
    width: 100,
  },
  {
    field: 'deny',
    headerName: 'Weiger',
    width: 100,
    renderCell: (cellValues) => {
      return (
        <Button color='error'>
          <ClearIcon color='error' />
        </Button>
      );
    },
    width: 100,
  },
];

export default columns;
