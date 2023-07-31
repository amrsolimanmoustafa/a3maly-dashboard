import { DashboardLayout } from '@/layouts/dashboard/layout';
import TemplatesContextProvider from '@/contexts/template-context';
import { Box, Typography, OutlinedInput, Button, Container } from '@mui/material';
import { CreateElementFromType } from '@/components/CreateElementFromType';
import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';

const Page = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [inputs, setInputs] = useState([
    {
      title: 'Number of words',
      type: 'input',
      placeholder: 'Number of words',
    },
  ]);

  const handleAddInput = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setInputs([
      ...inputs,
      {
        title: title,
        type: 'input',
        placeholder: title,
      },
    ]);
    setTitle(''); // Clear the input field after adding
  };

  return (
    <>
      <Head>
        <title>{t("Template Details")} | A3maly</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4">{t("Templates management")}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Box sx={{ bgcolor: '#f5f5f5', borderRadius: 2, padding: '20px' }}>
              <form onSubmit={handleAddInput}>
                <Box sx={{ py: 3 }}>
                  <Typography variant="h6">Enter title for Input</Typography>
                  <OutlinedInput
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    fullWidth
                    label="Title"
                  />
                  <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    Add
                  </Button>
                </Box>
              </form>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => (
  <DashboardLayout>
    <TemplatesContextProvider>{page}</TemplatesContextProvider>
  </DashboardLayout>
);

export default Page;
