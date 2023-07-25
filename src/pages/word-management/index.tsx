import { DashboardLayout } from '@/layouts/dashboard/layout';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { Box, Container, Stack, Typography, CardActions, Button, CardContent } from '@mui/material';
import { WordMangementSearch } from '@/sections/word-mangement/word-mangement-search';
import { usePageUtilities } from '@/hooks/use-page-utilities';
import { SetStateAction, useState } from 'react';

const Page = () => {
  const { t } = useTranslation();
  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller } =
    usePageUtilities();

  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');

  const handleDateChangeStart = (event: {
    target: { value: SetStateAction<string>; };
  }) => setDateStart(event.target.value);
  const handleDateChangeEnd = (event: {
    target: { value: SetStateAction<string>; };
  }) => setDateEnd(event.target.value);

  return (
    <>
      <Head>
        <title>{t('Word management')} | A3maly</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Typography variant="h4">{t('Word management')}</Typography>
            </Stack>
          </Stack>
          <WordMangementSearch
            onSearchChange={handleSearch}
            handleDateChangeStart={handleDateChangeStart}
            handleDateChangeEnd={handleDateChangeEnd}
          />
        </Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 5 }}>
          <Box sx={{
            minWidth: 275,
            backgroundColor: '#f5f5f5',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: 2
          }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {t('The number of words used')}
              </Typography>
              <Typography variant="h1">
                50
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">{t('Learn More')}</Button>
            </CardActions>
          </Box>
          <Box sx={{
            minWidth: 275,
            backgroundColor: '#f5f5f5',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: 2
          }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {t('The number of remaining words')}
              </Typography>
              <Typography variant="h1">
                50
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">{t('Learn More')}</Button>
            </CardActions>
          </Box>
          <Box sx={{
            minWidth: 275,
            backgroundColor: '#f5f5f5',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: 2
          }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {t('Chat-GPT account balance')}
              </Typography>
              <Typography variant="h1">
                50
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">{t('Learn More')}</Button>
              <Button size="small">{t('recharge')}</Button>
            </CardActions>
          </Box>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;