import {
    TableRow,
    TableCell,
    Typography,
    Stack,
  } from '@mui/material';
  import { useTranslation } from 'react-i18next';
  import React from 'react';
  export const ShipmentRow = ({
    shipment,index
  }:any ) => {

    const { t } = useTranslation();
    return (
      <TableRow hover key={index}>
        <TableCell>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Typography variant="subtitle2">{t(shipment?.material)}</Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Typography variant="subtitle2">{t(shipment?.quantity)}</Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Typography variant="subtitle2">{t(shipment?.size)}</Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Typography variant="subtitle2">{t(shipment?.type)}</Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Typography variant="subtitle2">{t(shipment?.weight)}</Typography>
          </Stack>
        </TableCell>
      </TableRow>
    );
  }