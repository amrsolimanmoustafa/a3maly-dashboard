import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import {
  Box,
  Card,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { Scrollbar } from '@/components/scrollbar';
import React from 'react';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import { ShipmentRow } from '@/sections/order/shipmentRow';

export const ShipmentTable = (props: any) => {
  const {
    items = [],
  } = props;

  const { t } = useTranslation();
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth:  800,minHeight:200  }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{t('material')}</TableCell>
                <TableCell>{t('quantity')}</TableCell>
                <TableCell>{t('size')}</TableCell>
                <TableCell>{t('type')}</TableCell>
                <TableCell>{t('weight')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((shipment: any,index:number) => (
                <ShipmentRow
                shipment={shipment}
                  key={index}
                  index={index}
                />
              ))}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
    </Card>
  );

}

ShipmentTable.propTypes = {
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
  selected: PropTypes.array
};