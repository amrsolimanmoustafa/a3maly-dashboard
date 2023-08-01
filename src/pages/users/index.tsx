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
import useAlert from "@/hooks/useAlert";
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

  const handleDownload = () => {
    // Replace the file URL with the actual path to your file in the project.
    const fileUrl = '../../../public/users.xlsx';

    // Create a hidden anchor element
    const anchor = document.createElement('a');
    anchor.href = fileUrl;
    anchor.download = 'users.xlsx'; // Specify the desired file name
    anchor.style.display = 'none';

    // Append the anchor element to the DOM and click it programmatically
    document.body.appendChild(anchor);
    anchor.click();

    // Remove the anchor from the DOM to keep it clean
    document.body.removeChild(anchor);
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
            <Box border={'1px solid rgb(147,130,234)'} borderRadius={'8px'} bgcolor={'#ffffff'} sx={{ display: "flex", justifyContent: "center" }}>
              <Grid container spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
                <Grid m={2} xs={1}>
                  <Box width={'64px'} height={'64px'} borderRadius={32} bgcolor={'#ffffff'} justifyContent={'center'} alignItems={'center'} display={'flex'}>
                  </Box>
                </Grid>
                <Grid alignSelf={'center'}>
                  <Typography color={'rgb(32,32,32)'} fontWeight={700}>{t('Add bulk Users')}</Typography>
                  <Typography noWrap>
                    {t('Download first')}
                    <Link onClick={() => handleDownload()} target="_blank"  download display={'inline'} sx={{cursor:"pointer"}} underline="always" color="primary"> users.xls </Link>
                    {t('then upload it here after filling the data')}
                  </Typography>
                </Grid>
                <Grid xs={2} flexGrow='1' textAlign={'center'} alignSelf={'center'}>
                  <input
                      type="file"
                      accept=".xlsx"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={(event)=> null}
                  />
                  <Button variant="outlined" sx={{ borderStyle: 'dashed', bgcolor: '#ECECEC' }} onClick={() => fileInputRef?.current?.click()}>
                    <Typography color="#626262">{t('Upload file')}</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>
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