import { usePageUtilities } from '@/hooks/use-page-utilities';
import { DashboardLayout } from '../../layouts/dashboard/layout';
import { useTranslation } from 'react-i18next';
import useAlert from '@/hooks/useAlert';
import { useState } from 'react';
import Head from 'next/head';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
const Page = () => {
  const { t } = useTranslation();
  const { showAlert, renderForAlert } = useAlert();
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller } =
    usePageUtilities();
  
    const handleSubmit = async (formdata: any) => {
      if (editMode) {
        showAlert(t("Department has been edited successfully").toString(), "success");
      } else {
        showAlert(t("Department has been added successfully").toString(), "success");
      }
      (async () => {
        await setEditMode(false);
        await setRecord({});
      })();
      // setOpen(false);
    };
  return (
    <>
      <Head>
        <title>{t("Package management")} | {t('app_name')}</title>
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
                <Typography variant="h4">{t("Package management")}</Typography>
              </Stack>
              <Button
                onClick={() => {
                }}
                variant="contained"
                sx={{ borderRadius: 0.5 }}
              >
                {t("Add")}
              </Button>

            </Stack>
            <DepartmentMangementSearch
              onSearchChange={handleSearch}
            />
            {(package?.count > 0) && (
              <WordMangementTable
                count={departmentContext?.count}
                items={departmentContext?.departments}
                onDeselectAll={departmentsSelection.handleDeselectAll}
                onDeselectOne={departmentsSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={departmentsSelection.handleSelectAll}
                onSelectOne={departmentsSelection.handleSelectOne}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                selected={departmentsSelection.selected}
                handleSuspend={departmentContext?.suspendDepartment}
                handleEdit={handleEditUser}
                handleDelete={handleDeleteUser}
              />
            )}
          </Stack>
        </Container>
        <DepartmentForm
          handleSubmit={handleSubmit}
          editMode={editMode}
          open={open}
          onClose={() => setOpen(false)}
          record={record}
          formItem={"department"}
        />
      </Box>
      {renderForAlert()}
    </>
  );
}

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;