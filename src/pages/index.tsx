import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import React, { useEffect } from 'react';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { OverviewLatestOrders } from '@/sections/overview/overview-latest-orders';
import StatsCard from '@/components/stats-card';
import PersonIcon from '@mui/icons-material/Person';
import UserIcon from '@/assets/icons/user-icon';
import WordIcon from '@/assets/icons/word-icon';
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();

  const stats = [
    {
      icon: <UserIcon width={50} height={50} />,
      name: "Number of Visitors",
      value: 4,
    },
    {
      icon: <UserIcon width={50} height={50} />,
      name: "users number",
      value: 4,
    },
    {
      icon: <WordIcon width={50} height={50} />,
      name: "The number of words",
      value: 4,
    },
    {
      icon: <WordIcon width={50} height={50} />,
      name: "number of models",
      value: 4,
    },

    {
      icon: <UserIcon width={50} height={50} />,
      name: "Active Users",
      value: 4,
    },
    {
      icon: <UserIcon width={50} height={50} />,
      name: "Inactive Users",
      value: 4,
    },
  ]

  return (
    <>
      <Head>
        <title>Overview | {t('app_name')}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
            <Grid xs={12} md={12} lg={8}>
              <Box sx={{ mb: 5 }} >
                <StatsCard
                  data={stats}
                />
              </Box>
              <OverviewLatestOrders
                orders={[]}
                sx={{ height: "100%" }}
              />
            </Grid>
        </Container>
      </Box>
    </>
);
}

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
