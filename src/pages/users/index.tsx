import { useEffect, useMemo, useState, useRef } from "react";
import Head from "next/head";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import {Box, Button, Container, Grid, Link, Stack, TextField, Typography} from "@mui/material";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { UsersTable } from "@/sections/users/users-table";
import { UsersSearch } from "@/sections/users/users-search";
import { useSelection } from "@/hooks/use-selection";
import { useUser } from "@/hooks/use-users";
import { useTranslation } from "react-i18next";
import UserContextProvider from "@/contexts/user-context";
import { usePageUtilities } from "@/hooks/use-page-utilities";
import { useRouter } from "next/router";
import useAlert from "@/hooks/use-alert";
import ConfirmationPopup from "@/components/confirmation-popup";
import UserForm from "@/@forms/users";
import GroupContextProvider from "@/contexts/group-context";

const groups = ["الادارة المالية", "الأدمن", "المشرفين"];
const roles = ["المدن", "ادارة العمولات", "ادارة الاشتراكات"];
const categories = ["الادارة", "العملاء", "المندوبين", "الورش", "المتاجر"];

interface ExcelRow {
  name: string;
  email: string;
  // Add other fields from your Excel data here
}

const Page = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const userContext = useUser();
  const { showAlert, renderForAlert } = useAlert();
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [excelData, setExcelData] = useState<ExcelRow[] | null>(null);
  const onClose = () => {
    setOpen(false);
  };
  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller } =
    usePageUtilities();

  const usersIds: any[] | undefined = useMemo(
    () => userContext?.users?.map((user: any) => user.id),
    [userContext?.users]
  );
  const usersSelection = useSelection(usersIds);

  useEffect(() => {
    userContext?.fetchUsers(controller.page, controller.rowsPerPage, controller.filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller]);

  const handleSubmit = async (formdata: any) => {
    if (editMode) {
      userContext?.EditUser(formdata);
      showAlert(t("User has been edited successfully").toString(), "success");
    } else {
      userContext?.AddUser(formdata);
      showAlert(t("User has been added successfully").toString(), "success");
    }
    (async () => {
      await setEditMode(false);
      await setRecord({});
    })();
    // setOpen(false);
  };

  const handleEditUser = (role: any) => {
    setRecord(role);
    setEditMode(true);
    setOpen(true);
  };

  const handleAddUser = () => {
    setEditMode(false);
    setRecord({});
    setOpen(true);
  };

  const handleDeleteUser = (role_id: string) => {
    setSelectedUserId(role_id);
    setOpenConfirm(true);
  };
  const DeleteUser = () => {
    setOpenConfirm(false);
    userContext?.DeleteUser(selectedUserId);
    showAlert(t("User has been deleted successfully").toString(), "success");
  };

  return (
    <>
      <Head>
        <title>{t("Users")} | {t('app_name')}</title>
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
            confirmFuntion={DeleteUser}
            open={openConfirm}
            setOpen={setOpenConfirm}
          />
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{t("Users")}</Typography>
              </Stack>
              <Button
                onClick={() => {
                  handleAddUser();
                }}
                variant="contained"
                sx={{ borderRadius: 0.5 }}
              >
                {t("Add")}
              </Button>
            </Stack>
            <UsersSearch
              onSearchChange={handleSearch}
              handelfilterCategory={userContext?.handelfilterCategory}
              handelfilterGroups={userContext?.handelfilterGroups}
              handelfilterRoles={userContext?.handelfilterRoles}
              categories={categories}
              groups={groups}
              roles={roles}
            />
            {(userContext == undefined || userContext?.count > 0) && (
              <UsersTable
                count={userContext?.count}
                items={userContext?.users}
                onDeselectAll={usersSelection.handleDeselectAll}
                onDeselectOne={usersSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={usersSelection.handleSelectAll}
                onSelectOne={usersSelection.handleSelectOne}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                selected={usersSelection.selected}
                handleSuspend={userContext?.suspendUsers}
                handleEdit={handleEditUser}
                handleDelete={handleDeleteUser}
              />
            )}
          </Stack>
        </Container>
        {
          //Add edit form Role
        }
        <UserForm
          handleSubmit={handleSubmit}
          editMode={editMode}
          open={open}
          onClose={onClose}
          record={record}
          formItem={"user"}
        />
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => (
  <DashboardLayout>
    <UserContextProvider>
      <GroupContextProvider>{page}</GroupContextProvider>
    </UserContextProvider>
  </DashboardLayout>
);

export default Page;