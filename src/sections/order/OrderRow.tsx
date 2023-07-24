import {
  TableRow,
  TableCell,
  Typography,
  Stack,
} from '@mui/material';
import { IOrders } from '@/@types/orders';
import { MenuButton } from '@/components/button-menu';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type TOrdersProps = {
  order: IOrders;
}

export const OrderRow = ({
  order,
}: TOrdersProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleRoute = (event: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/orders/${order.id}`);
  };

  return (
    <TableRow hover key={order.id}>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{order.number}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2"sx={{color:order?.status === 'ACCEPTED'?"#03D930":order?.status === 'CANCELED'?"#E21B32":order?.status === 'DELIVERED'?"#0ea12d":""}}>{t(order.status)}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{order?.shipping_amount}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{order?.driver?.name==null? t("Not Assigned") :<Link href="/drivers-management/driver/account">{ order?.driver?.name }</Link>}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{order?.current_branch ? order?.current_branch?.name : "-----"}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{new Date(order.created_at).toLocaleDateString()}</Typography>
        </Stack>
      </TableCell>
      <MenuButton
        items={[
          { label: t("View"), onClick: handleRoute },
          // { label: "Edit", onClick: handleRoute },
          // { label: "Delete", onClick: handleRoute },
          // { label: "Edit", onClick: handleRoute },
          // { label: "Delete", onClick: null },
        ]}
      />
    </TableRow>
  );
}