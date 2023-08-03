import { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { DashboardLayout } from '../layouts/dashboard/layout';
import { useSelection } from '@/hooks/use-selection';
import { useTranslation } from 'react-i18next';
import { ContactMessagesTable } from '@/sections/contact-messages/contact-message-table';
import { useContactMessage } from '@/hooks/use-contact-messages';
import { SearchBar } from '@/sections/shared/search-bar';

const Page = () => {
  const { t } = useTranslation();

  const contactMessageContext = useContactMessage();
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
    filter: '',
  });
  const contactMessagesIds: any[] | undefined = useMemo(() => [], []);
  //   const contactMessagesIds : any[] | undefined = useMemo(() =>  contactMessageContext?.contactMessages.map((item: any) => item.id), [contactMessageContext?.contactMessages]);

  const contactMessagesSelection = useSelection(contactMessagesIds);

  const handlePageChange = (event: any, newPage: number) => {
    setController({
      ...controller,
      page: newPage
    });
  };

  const handleRowsPerPageChange = (event: any) => {
    setController({
      ...controller,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    });
  };

  const handleSearch = (event: any) => {
    setController({
      ...controller,
      page: 0,
      filter: event.target.value,
    });
  };

  useEffect(() => {
    contactMessageContext?.fetchContactMessages(controller.page, controller.rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller]);


  return (
    <>
      <Head>
        <title>Contact messages | {t('app_name')}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{t('ContactMessages')}</Typography>
                <Stack alignItems="center" direction="row" spacing={1}>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    {t('Import')}
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    }
                  >
                    {t('Export')}
                  </Button>
                </Stack>
              </Stack>
              <div>
                {/* <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Add
                </Button> */}
              </div>
            </Stack>
            <SearchBar onSearchChange={handleSearch} placeholder={`Search messages`} />
            {(contactMessageContext == undefined || contactMessageContext?.count > 0) && (
              <ContactMessagesTable
                count={contactMessageContext?.count}
                items={contactMessageContext?.contactMessages}
                onDeselectAll={contactMessagesSelection.handleDeselectAll}
                onDeselectOne={contactMessagesSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={contactMessagesSelection.handleSelectAll}
                onSelectOne={contactMessagesSelection.handleSelectOne}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                selected={contactMessagesSelection.selected}
                handleSuspend={contactMessageContext?.deleteContactMessage}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
