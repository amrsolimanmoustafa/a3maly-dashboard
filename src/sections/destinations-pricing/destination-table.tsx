import {
  Card,
  Box,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow, SvgIcon
} from '@mui/material';

import { Scrollbar } from "@/components/scrollbar";
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import React, { useState } from 'react';
import DestinationRow from '@/sections/destinations-pricing/destination-row';
import PropTypes from 'prop-types';
import { DriversTable } from '@/sections/drivers/drivers-table';
import { useTranslation } from 'react-i18next';

export const DestinationTable = (props: any) => {
  const { t } = useTranslation();
  const {
    count,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page,
    handleSuspend = () => {},
    rowsPerPage,
    selected,
  } = props;


  // const selectedSome = selected.length > 0 && selected.length < items.length;
  // const selectedAll = items ? items.length > 0 && selected.length === items.length : false;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    // checked={selectedAll}
                    // indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{t('Destination')}</TableCell>
                <TableCell>{t('Size Price')}</TableCell>
                <TableCell>{t('Weight Price')}</TableCell>
                <TableCell>
                  <SvgIcon fontSize="small">
                    <CogIcon />
                  </SvgIcon>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((destination: any) => (
                <DestinationRow
                  key={destination.id}
                  destination={destination}
                  selected={selected}
                  onSelectOne={onSelectOne}
                  onDeselectOne={onDeselectOne}
                  handleSuspend={handleSuspend}
                />
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        labelRowsPerPage={t("Rows Per Page")}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}

DriversTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  handleSuspend: PropTypes.func,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};