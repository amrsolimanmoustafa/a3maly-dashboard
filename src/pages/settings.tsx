import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { DashboardLayout } from '../layouts/dashboard/layout';
import { SettingsNotifications } from '../sections/settings/settings-notifications';
import { SettingsPassword } from '../sections/settings/settings-password';
import { useTranslation } from 'react-i18next';

const Page = () => {
  const { t } = useTranslation();
  return (
  <>
    <Head>
      <title>
        Settings | {t('app_name')}
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Typography variant="h4">
            Settings
          </Typography>
          <SettingsNotifications />
          <SettingsPassword />
        </Stack>
      </Container>
    </Box>
  </>
)
};

Page.getLayout = (page: any) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
