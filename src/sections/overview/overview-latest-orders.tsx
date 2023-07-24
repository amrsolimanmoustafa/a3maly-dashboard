import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow, Typography
} from '@mui/material';
import React from 'react';
import { Scrollbar } from '@/components/scrollbar';
import { SeverityPill } from '@/components/severity-pill';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';

type statusMapType = {
  pending: string;
  delivered: string;
  refunded: string;
};

function getStatusMap(key: keyof statusMapType, obj: statusMapType = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
},) {
  return obj[key];
}

export const OverviewLatestOrders = (props: any) => {
  const { orders = [], sx } = props;

  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Card sx={sx}>
      <CardHeader title={t('Latest Orders')} />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {t('Order Number')}
                </TableCell>
                <TableCell>
                  {t('Driver')}
                </TableCell>
                <TableCell sortDirection="desc">
                  {t('Created at')}
                </TableCell>
                <TableCell>
                  {t('Status')}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order: any) => {

                return (
                  <TableRow
                    hover
                    key={order.id}
                  >
                    <TableCell>
                      {order.number}
                    </TableCell>
                    <TableCell>
                      {order?.driver?.name==null? t("Not Assigned") :<Link href="/drivers-management/driver/account">{ order?.driver?.name }</Link>}
                    </TableCell>
                    <TableCell>
                      {new Date(order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={getStatusMap(order.status)}>
                        <Typography variant="subtitle2"sx={{color:order?.status === 'ACCEPTED'?"#03D930":order?.status === 'CANCELED'?"#E21B32":order?.status === 'DELIVERED'?"#0ea12d":""}}>{t(order.status)}</Typography>
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
          onClick={() => router.push('/orders')}
        >
          {t('View all')}
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
