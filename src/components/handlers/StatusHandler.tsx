import { Button, Grid } from '@mui/material';
import React, { useEffect } from 'react';

const StatusHandler = ({ input, styles, handleChange }: any) => {
  const [selectedStatus, setSelectedStatus] = React.useState('');

  useEffect(() => {
    setSelectedStatus(status);
  }, [status]);

  return (
    <Grid container gap={1}>
      {input.statuses.map((status: any) => (
        <Button
          key={status.id}
          onClick={() => {
            setSelectedStatus(status.id);

          }}
          variant={selectedStatus === status.id ? 'contained' : 'outlined'}
        >
          {status.name}
        </Button>
      ))}
    </Grid>
  );
};

export default StatusHandler;