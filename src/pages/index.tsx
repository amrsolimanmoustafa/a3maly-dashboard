import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import React, { useEffect } from 'react';
import { DashboardLayout } from '@/layouts/dashboard/layout';
import { OverviewLatestOrders } from '@/sections/overview/overview-latest-orders';

const Page = () => {


  return (
    <>
      <Head>
        <title>Overview | Pronto</title>
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
