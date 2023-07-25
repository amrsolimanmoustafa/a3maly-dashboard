import { DashboardLayout } from '../../layouts/dashboard/layout';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { Box, Container, Stack, Typography } from '@mui/material';
import { DepartmentMangementSearch } from '@/sections/department-mangement/department-mangement-search';
import { usePageUtilities } from '@/hooks/use-page-utilities';
import DepartmentContextProvider from '@/contexts/departmentContext';
import GroupContextProvider from '@/contexts/group-context';
import { useDepartment } from '@/hooks/use-department';
import useAlert from '@/hooks/useAlert';
import { useEffect, useMemo, useState } from 'react';
import { useSelection } from '@/hooks/use-selection';
import { WordMangementTable } from '@/sections/department-mangement/word-mangement-table';
const Page = () => {
  const { t } = useTranslation();
  const departmentContext = useDepartment();
  const { showAlert, renderForAlert } = useAlert();
  const [editMood, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller } =
    usePageUtilities();

  const departmentsIds: any[] | undefined = useMemo(
    () => departmentContext?.departments?.map((department: any) => department.id),
    [departmentContext?.departments]
  );

  const departmentsSelection = useSelection(departmentsIds);

  useEffect(() => {
    departmentContext?.fetchDepartmets(controller.page, controller.rowsPerPage, controller.filter);
  }, [controller])

  const handleSubmit = async (formdata: any) => {
    if (editMood) {
      // departmentContext?.EditUser(formdata);
      showAlert(t("Department has been edited successfully").toString(), "success");
    } else {
      departmentContext?.AddDepartment(formdata);
      showAlert(t("Department has been added successfully").toString(), "success");
    }
    (async () => {
      await setEditMode(false);
      await setRecord({});
    })();
    // setOpen(false);
  };

  const handleAddUser = () => {
    setEditMode(false);
    setRecord({});
    setOpen(true);
  };

  const handleDeleteUser = (role_id: string) => {
    setSelectedDepartmentId(role_id);
    setOpenConfirm(true);
  };

  const DeleteUser = () => {
    setOpenConfirm(false);
    departmentContext?.suspendDepartment(selectedDepartmentId);
    showAlert(t("Department has been deleted successfully").toString(), "success");
  };

  return (
    <>
      <Head>
        <title>{t("Department management")} | A3maly</title>
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
                <Typography variant="h4">{t("Department management")}</Typography>
              </Stack>
            </Stack>
            <DepartmentMangementSearch
              onSearchChange={handleSearch}
            />
            {(departmentContext == undefined || departmentContext?.count > 0) && (
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
                handleDelete={handleDeleteUser}
              />
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
}

Page.getLayout = (page: any) => (
  <DashboardLayout>
    <DepartmentContextProvider>
      <GroupContextProvider>
        {page}
      </GroupContextProvider>
    </DepartmentContextProvider>
  </DashboardLayout>
);

export default Page;