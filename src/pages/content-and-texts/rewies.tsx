import { DashboardLayout } from '@/layouts/dashboard/layout';
import React ,{useEffect, useRef, useState} from "react";
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid, Button, 
} from '@mui/material';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Logoimg from '../../assets/logo.png';
import Logoimg2 from '../../assets/3d8619582dfb78d5d86eb21f9c6e6c8cb1fce8ae8e937170e764385a38d508eb9ce32d91215b533fba0026c3ca14b5e4d0a8c1f19254dc7e0899b9c248782a18ca376f8c96169a53ca55c3878da2cf9ff6ed449bda62281cba9b168ea2770db1f.webp';
import { ContentTable } from '@/sections/content-and-texts/contentImg-table';
import Form from '@/@forms/text-and-content-upload';
const Page = () => {
  const {t}= useTranslation();
  const title = "What our clients said about us";
  const handleSubmit = async (formState: any) => {
    console.log(formState);
  };
  return (
    <>
      <Head>
        <title>
          {t(title)} | {t('app_name')}
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
              <Stack spacing={1}>
                <Typography variant="h4" sx={{display:'flex',gap:1,alignItems:"center"}}>
                      <RateReviewIcon fontSize="large"/>
                    {t(title)}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between" spacing={4} sx={{ mb: 2 }}>
                <Typography variant="h6" sx={{display:'flex',gap:1,alignItems:"center"}}>
                    {t("Insert Evaluation Image")}
                </Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" spacing={4} sx={{ mb: 2 }}>
            {/*Form of text-and-content */}
             <Form handleSubmit={handleSubmit} upload="image" Description={false}  />
            </Stack>
          </Stack>
          <Grid sx={{ bgcolor: "#ffffff", width: "100%", borderRadius: 1, mt: 3 }}>
          <ContentTable 
              count={3}
              items={[{img:Logoimg.src},{img:Logoimg2.src}]}
              page={1}
              rowsPerPage={10}
             />
          </Grid>
        </Container>
      </Box>
    </>
  );
}

Page.getLayout = (page: any) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;