import { DashboardLayout } from '@/layouts/dashboard/layout';
import React ,{useEffect, useMemo, useState} from "react";
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid, Button, 
} from '@mui/material';
import useAlert from '@/hooks/useAlert';
import { useSelection } from "@/hooks/use-selection";
import { SearchBar } from "@/sections/shared/search-bar";
import { usePageUtilities } from "@/hooks/use-page-utilities";
import { ContentTable } from "@/sections/content-and-texts/content-table";
import ConfirmationPopup from '@/components/confirmation-popup';
import Form from '@/@forms/Content-text-form';
import GavelIcon from "@mui/icons-material/Gavel";
const Page = () => {
  const {t}= useTranslation();
  const title = "How do you guarantee your rights";
  const { showAlert, renderForAlert } = useAlert()
  const [editMood, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [selectedRightId, setSelectedRightId] = useState<string>("");
  const [openConfirm, setOpenConfirm] = useState(false)
  const onClose = () => {
    setOpen(false);
  };

  const rightsContext = {rights: [], count: 0};

  const ordersIds: any[] | undefined = useMemo(
    () =>
      rightsContext == undefined ? undefined : rightsContext?.rights?.map((right: any) => right.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const ordersSelection = useSelection(ordersIds);

  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller } =
    usePageUtilities();

  // useEffect(() => {
    // rightsContext?.fetchRights(controller.page, controller.rowsPerPage, controller.filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [controller]);

  const handleSubmit = async (formdata: any) => {
    console.log(formdata);
    if (editMood) {
      // rightsContext?.EditRight(formdata);
      showAlert(t("Content has been edited successfully").toString(), "success");
    } else {
      // rightsContext?.AddRight(formdata);
      showAlert(t("Content has been added successfully").toString(), "success");
    }
    (async () => {
      await setEditMode(false);
      await setRecord({});
    })();
    setOpen(false);
  };

  const handleEditRight =  (right: any) => {
    setRecord(right);
    setEditMode(true);
    setOpen(true);
  };

  const handleAddRight =  () => {
    setEditMode(false);
    setRecord({});
    setOpen(true);
  };

  const handleDeleteRight = (right_id: string) =>{
    setSelectedRightId(right_id);
    setOpenConfirm(true);
  }
  const DeleteRight =  () => {
    setOpenConfirm(false);
    // rightsContext?.DeleteRight(selectedRightId);
    showAlert(t("Content has been deleted successfully").toString(), "success");
  };
  return (
    <>
      <Head>
        <title>{t(title)} | {t('app_name')}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
        <ConfirmationPopup message={"Are you sure to delete this Content?"} confirmFuntion={DeleteRight} open={openConfirm} setOpen={setOpenConfirm} />
          <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
            <Stack spacing={1}>
              <Typography variant="h4" sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <GavelIcon fontSize="large" />
                {t(title)}
              </Typography>
              </Stack>
              <Button
                onClick={() => {
                  handleAddRight();
                }}
                variant="contained"
                sx={{ borderRadius: 0.5 }}
              >
                {t("Add")}
              </Button>
            </Stack>
            <SearchBar onSearchChange={handleSearch} placeholder={t(`Search`) + " " + t(title)} />
            {(rightsContext == undefined || rightsContext?.count > 0) && (
              <ContentTable
                count={rightsContext?.count}
                items={rightsContext?.rights}
                onDeselectAll={ordersSelection.handleDeselectAll}
                onDeselectOne={ordersSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={ordersSelection.handleSelectAll}
                onSelectOne={ordersSelection.handleSelectOne}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                selected={ordersSelection.selected}
                // handleSuspend={rightsContext?.suspendRights}
                handleEdit={handleEditRight}
                handleDelete={handleDeleteRight}
              />
            )}
          </Stack>
        </Container>
        {
          //Add edit form Right
        }
        <Form
          handleSubmit={handleSubmit}
          editMood={editMood}
          open={open}
          onClose={onClose}
          record={record}
          formItem={"Content"}
          width={500}
          height={300}
        />
      </Box>
      {renderForAlert()}
    </>
  );
};

Page.getLayout = (page: any) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
