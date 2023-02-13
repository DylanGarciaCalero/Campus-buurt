import React, { useState } from 'react';
import {
  DataGrid,
  GridColumns,
  GridRowsProp,
  GridSortModel,
} from '@mui/x-data-grid';

interface DataGridProps {
  columns: GridColumns;
  rows: GridRowsProp;
  onCellClick: any;
}

const styles = {
  grid: 'mt-8',
};

const Datagrid = ({ columns, rows, onCellClick }: DataGridProps) => {
  const [sortModel, setSortModel] = useState<GridSortModel>([
    { field: 'id', sort: 'asc' },
  ]);

  return (
    <div className={styles.grid}>
      <DataGrid
        rows={rows}
        columns={columns}
        sortModel={sortModel}
        onCellClick={onCellClick}
        onSortModelChange={(model) => setSortModel(model)}
        density='comfortable'
        disableSelectionOnClick
        checkboxSelection
        autoHeight
      />
    </div>
  );
};

export default Datagrid;
