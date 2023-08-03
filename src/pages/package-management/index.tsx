import { usePageUtilities } from '@/hooks/use-page-utilities';
import { DashboardLayout } from '../../layouts/dashboard/layout';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import useAlert from '@/hooks/useAlert';
import { useSelection } from '@/hooks/use-selection';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import PackageManagementTable from '@/sections/package-management/package-management-table';
import ConfirmationPopup from '@/components/confirmation-popup';
import PackageForm from '@/@forms/package';
const Page = () => {
  const { t } = useTranslation();
  const { showAlert, renderForAlert } = useAlert();
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [packages, setPackages] = useState<any>({ 
    data: [
      {
        id: 1,
        name_en: "package one",
        name_ar: "الباكدج الاول",
        price: 10,
        words: 1500,
      },
      {
        id: 2,
        name_en: "package Two",
        name_ar: "الباكدج الثاني",
        price: 18,
        words: 3000,
      }
    ],
    meta: {
    count: 2
  } });
  const packageIds: any[] | undefined = useMemo(
    () => packages.data?.map((item: any) => item.id),
    [packages.data]
  );
  const packagesSelection = useSelection(packageIds);
  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller } =
    usePageUtilities();

  const handleEditRecord = (role: any) => {
    setRecord(role);
    setEditMode(true);
    setOpen(true);
  };

  const handleAddRecord = () => {
    setEditMode(false);
    setRecord({});
    setOpen(true);
  };

  const handleDeleteRecord = (id: string) => {
    setSelectedRecord(id);
    setOpenConfirm(true);
  };

  const DeleteRecord = () => {
    setOpenConfirm(false);
    setPackages(packages.filter((item : any) => item.id !== selectedRecord));
    showAlert(t("Package has been deleted successfully").toString(), "success");
  };
  const handleSubmit = async (formdata: any) => {
    if (editMode) {
      showAlert(t("Package has been edited successfully").toString(), "success");
    } else {
      showAlert(t("Package has been added successfully").toString(), "success");
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
          <ConfirmationPopup
            message={"Are you sure to delete this User?"}
            confirmFuntion={DeleteRecord}
            open={openConfirm}
            setOpen={setOpenConfirm}
          />
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{t("Package management")}</Typography>
              </Stack>
              <Button
                onClick={() => {
                  handleAddRecord()
                }}
                variant="contained"
                sx={{ borderRadius: 0.5 }}
              >
                {t("Add")}
              </Button>

            </Stack>
            <PackageManagementTable
              items={packages.data}
              onDeselectAll={packagesSelection.handleDeselectAll}
              onDeselectOne={packagesSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={packagesSelection.handleSelectAll}
              onSelectOne={packagesSelection.handleSelectOne}
              count={packages.meta?.count}
              page={controller.page}
              rowsPerPage={controller.rowsPerPage}
              selected={packagesSelection.selected}
              handleEdit={handleEditRecord}
              handleDelete={handleDeleteRecord}
            />
          </Stack>
        </Container>
        <PackageForm
          handleSubmit={handleSubmit}
          editMode={editMode}
          open={open}
          onClose={() => setOpen(false)}
          record={record}
        />
      </Box>
      {renderForAlert()}
    </>
  );
}

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;