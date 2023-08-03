import { DashboardLayout } from '@/layouts/dashboard/layout';
import TemplatesContextProvider from '@/contexts/template-context';
import { Box, Typography, OutlinedInput, Button, Container } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import TemplateDetailsTable from '@/sections/template-mangement/template-details-table';
import { usePageUtilities } from '@/hooks/use-page-utilities';

const Page = () => {
  const { t } = useTranslation();
  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller } =
  usePageUtilities();
  const [title, setTitle] = useState('');
  const [templateDetails, setTemplateDetails] = useState({meta: {count:1, page:1}, data:[]});
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
        <title>{t("Template Details")} | {t('app_name')}</title>
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
            <TemplateDetailsTable
                count={templateDetails.meta.count}
                items={templateDetails.data}
                // onDeselectAll={templatesSelection.handleDeselectAll}
                // onDeselectOne={templatesSelection.handleDeselectOne}
                // onPageChange={handlePageChange}
                // onRowsPerPageChange={handleRowsPerPageChange}
                // onSelectAll={templatesSelection.handleSelectAll}
                // onSelectOne={templatesSelection.handleSelectOne}
                // openField={handleEditEditTemplate}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                // selected={templatesSelection.selected}
                // handleSuspend={templateContext?.suspendTemplate}
                // handleEdit={handleEditTemplate}
                // handleDelete={handleDeleteTEmplate}
              />
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
