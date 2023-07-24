import {
  Card,
  CardHeader,
  CardContent,
  Typography
} from '@mui/material';

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent
} from '@mui/lab';
import { useTranslation } from 'react-i18next';
import Grid from '@mui/material/Grid';
import React from 'react';
import Link from 'next/link';
import { format } from "date-fns";
export const OrderDetailsCard = (props: any) => {
  const { order } = props;  
  const { t } = useTranslation();

  const index = order?.status === "DELIVERED" ? 3 : order?.status === 'RECEIVED'|| order?.status ==="RECEIVED_BY_OFFICE_A"|| order?.status ==="RECEIVED_BY_OFFICE_B" ? 2 : order?.status === "ACCEPTED" ? 1 :order?.status === 'CANCELED'|| order?.status ==="EXPIRED"? 1 : order?.status === "PENDING"|| order?.status ==="CREATED"|| order?.status ==="LISTED" ? 0 : -1
  const CanceledStatus = [
    {
      id: "0",
      title: t('PENDING'),
      time: "09:00 pm",
      status: true,
    },
    {
      id: "1",
      title: t('CANCELED'),
      status: false,
    }
  ]
  const ExpiredStatus = [
    {
      id: "0",
      title: t('PENDING'),
      time: "09:00 pm",
      status: true,
    },
    {
      id: "1",
      title: t('EXPIRED'),
      status: false,
    }
  ]



  const status = [
    {
      id: "0",
      title: t('PENDING'),
      time: "09:00 pm",
      status: true,
    },
    {
      id: "1",
      title: t('ACCEPTED'),
      time: "09:00 pm",
      status: true,
    },
    {
      id: "2",
      title: t('RECEIVED'),
      time: "09:00 pm",
      status: true,
    },
    {
      id: "3",
      title: t('DELIVERED'),
      status: false,
    }
  ]

  return (
    <Card>
      <CardHeader title={t("Order Details")}/>
      <hr style={{opacity:.1}} />
        <CardContent>
          <Grid
            container
            justifyContent={'space-evenly'}
          >
            <Grid
              xs={12}
              md={6}
              lg={7}
              justifyContent={'space-between'}
            >
              <Typography   sx={{py:1}}  variant="subtitle1">{t("The amount to be collected")}: {order.collect_amount}</Typography>
              <Typography  sx={{py:1}}  variant="subtitle1">{t("order price")}: {order.shipping_amount}</Typography>
              <Typography  sx={{py:1}}  variant="subtitle1">{t("Driver")}: {order?.driver?.name==null? t("Not Assigned") :<Link href="/drivers-management/driver/account">{ order?.driver?.name }</Link>}</Typography>
              <Typography  sx={{py:1}}  variant="subtitle1">{t("Created at")}: {format(Date.parse(order.created_at), "dd/MM/yyyy")}</Typography>
              <Typography  sx={{py:1}}  variant="subtitle1">{t("branch name")}: {order?.current_branch ? order?.current_branch?.name : "--"}</Typography>
              <Typography  sx={{py:1}}  variant="subtitle1">{t("driver reviewed")}: {order.driver_reviewed?t("yes"):t("Not Yet")}</Typography>
              <Typography  sx={{py:1}}  variant="subtitle1">{t("Estimated Time")}: {order.estimated_time + t("Munit")} </Typography>
              <Typography  sx={{py:1}}  variant="subtitle1">{t("Payee")}: {t(order.payee)}</Typography>
              <Typography  sx={{py:1}}  variant="subtitle1">{t("pin code")}: {order.pin_code?order.pin_code:t("Not exist")}</Typography>
              <Typography  sx={{py:1}}  variant="subtitle1">{t("recipient reviewed")}: {order.recipient_reviewed?t("yes"):t("Not Yet")}</Typography>
              <Typography  sx={{py:1}}  variant="subtitle1">{t("sender reviewed")}: {order.sender_reviewed?t("yes"):t("Not Yet")}</Typography>
            </Grid>
            <Grid
              xs={12}
              md={6}
              lg={5}
            >
              <Timeline>
                {
                  order?.status !== "CANCELED" && order?.status !="EXPIRED"?
                status.map((e, i) => (
                  <TimelineItem key={e.id}>
                    <TimelineSeparator>
                      <TimelineDot variant={ i > index ? "outlined" : undefined} color={"primary"} />
                      {i != status.length - 1 ? <TimelineConnector /> : null}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="h6" component="span">
                        {e.title}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))
              :
              order?.status === "CANCELED"?
              CanceledStatus.map((e, i) => (
                <TimelineItem key={e.id}>
                  <TimelineSeparator>
                    <TimelineDot variant={ i > index ? "outlined" : undefined} color={"primary"} />
                    {i != CanceledStatus.length - 1 ? <TimelineConnector /> : null}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="h6" component="span">
                      {e.title}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))
              :
              ExpiredStatus.map((e, i) => (
                <TimelineItem key={e.id}>
                  <TimelineSeparator>
                    <TimelineDot variant={ i > index ? "outlined" : undefined} color={"primary"} />
                    {i != ExpiredStatus.length - 1 ? <TimelineConnector /> : null}
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="h6" component="span">
                      {e.title}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))
              }
              </Timeline>
            </Grid>
          </Grid>
        </CardContent>
    </Card>
  );
}