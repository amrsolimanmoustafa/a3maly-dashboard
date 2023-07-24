import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Button, Container, Link, Stack, SvgIcon, Typography } from '@mui/material';
import { UsersTable } from "@/sections/users/users-table";
import { useSelection } from "@/hooks/use-selection";
import { useClient } from "@/hooks/use-clients";
import { useTranslation } from "react-i18next";
import { usePageUtilities } from "@/hooks/use-page-utilities";
import { SearchBar } from "@/sections/shared/search-bar";
import { DashboardLayout } from "@/layouts/dashboard/layout";
import ClientContextProvider from "@/contexts/client-context";
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';

const Page = () => {
  const title = "Users";

  const { t } = useTranslation();

  const clientContext = useClient();

  const clientsIds: any[] | undefined = useMemo(
    () => clientContext?.clients?.map((client: any) => client.id),
    [clientContext?.clients]
  );
  const clientsSelection = useSelection(clientsIds);

  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller } = usePageUtilities()

  useEffect(() => {
    clientContext?.fetchClients(controller.page, controller.rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller]);
  
  return (
    <>
      <Head>
        <title>{title} | Pronto</title>
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
                <Typography variant="h4">{t(title)}</Typography>
              </Stack>
              <div>
                 <Button
                   startIcon={
                     <SvgIcon fontSize="small">
                     <PlusIcon />
                     </SvgIcon>
                   }
                   variant="contained"
                   >
                   {t("Add")}
                 </Button>
              </div>
            </Stack>
            <SearchBar onSearchChange={handleSearch} placeholder={`Search ` + title.toLowerCase()} />
            {(clientContext == undefined || clientContext?.count > 0) && (
              <UsersTable
                count={clientContext?.count}
                items={clientContext?.clients}
                onDeselectAll={clientsSelection.handleDeselectAll}
                onDeselectOne={clientsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={clientsSelection.handleSelectAll}
                onSelectOne={clientsSelection.handleSelectOne}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                selected={clientsSelection.selected}
                handleSuspend={clientContext?.suspendClient}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => (
  <ClientContextProvider>
    <DashboardLayout>{page}</DashboardLayout>;
  </ClientContextProvider>
);
export default Page;
