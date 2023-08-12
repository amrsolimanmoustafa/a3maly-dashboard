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
import HandshakeIcon from '@mui/icons-material/Handshake';
import useAlert from '@/hooks/use-alert';
import { useSelection } from "@/hooks/use-selection";
import { SearchBar } from "@/sections/shared/search-bar";
import { usePageUtilities } from "@/hooks/use-page-utilities";
import { ContentTable } from "@/sections/content-and-texts/content-table";
import ConfirmationPopup from '@/components/confirmation-popup';
import Form from '@/@forms/Content-text-form';

const Page = () => {
  const {t}= useTranslation();
  const title = "How does A3maly help you";
  const { showAlert, renderForAlert } = useAlert()
  const [editMood, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [selectedHelpId, setSelectedHelpId] = useState<string>("");
  const [openConfirm, setOpenConfirm] = useState(false)
  const onClose = () => {
    setOpen(false);
  };
  const [helpsContext, setHelpsContext] = useState({helps: [], suspendHelps: [], count: 0})
  const ordersIds: any[] | undefined = useMemo(
    () =>
      helpsContext?.helps.map((help: any) => help.id),
    []
  );

  const ordersSelection = useSelection(ordersIds);

  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller } =
    usePageUtilities();

  const handleSubmit = async (formdata: any) => {
    console.log(formdata);
    if (editMood) {
      // handleEditHelp(formdata);
      showAlert(t("Content has been edited successfully").toString(), "success");
    } else {
      // handleAddHelp(formdata);
      showAlert(t("Content has been added successfully").toString(), "success");
    }
    (async () => {
      await setEditMode(false);
      await setRecord({});
    })();
    setOpen(false);
  };

  const handleEditHelp =  (help: any) => {
    setRecord(help);
    setEditMode(true);
    setOpen(true);
  };

  const handleAddHelp =  () => {
    setEditMode(false);
    setRecord({});
    setOpen(true);
  };

  const handleDeleteHelp = (help_id: string) =>{
    setSelectedHelpId(help_id);
    setOpenConfirm(true);
  }
  const DeleteHelp =  () => {
    setOpenConfirm(false);
    // handleDeleteHelp(selectedHelpId);
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
        <ConfirmationPopup message={"Are you sure to delete this Content?"} confirmFuntion={DeleteHelp} open={openConfirm} setOpen={setOpenConfirm} />
          <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
            <Stack spacing={1}>
              <Typography variant="h4" sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <HandshakeIcon fontSize="large" />
                {t(title)}
              </Typography>
              </Stack>
              <Box
              title={t('You can just add 5 elements')}
              >
              <Button
                onClick={() => {
                  handleAddHelp();
                }}
                variant="contained"
                sx={{ borderRadius: 0.5 }}
                disabled={helpsContext?.helps? helpsContext?.helps?.length>=5 : false}
              >
                {t("Add")}
              </Button>
              </Box>
            </Stack>
            <SearchBar onSearchChange={handleSearch} placeholder={t(`Search`) + " " + t(title)} />
            {(helpsContext == undefined || helpsContext?.count > 0) && (
              <ContentTable
                count={helpsContext?.count}
                items={helpsContext?.helps}
                onDeselectAll={ordersSelection.handleDeselectAll}
                onDeselectOne={ordersSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={ordersSelection.handleSelectAll}
                onSelectOne={ordersSelection.handleSelectOne}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                selected={ordersSelection.selected}
                // handleSuspend={handleSuspendHelps}
                handleEdit={handleEditHelp}
                handleDelete={handleDeleteHelp}
              />
            )}
          </Stack>
        </Container>
        {
          //Add edit form Help
        }
        <Form
          handleSubmit={handleSubmit}
          editMood={editMood}
          open={open}
          onClose={onClose}
          record={record}
          formItem={"Content"}
          width={150}
          height={150}
        />
      </Box>
      {renderForAlert()}
    </>
  );
};

Page.getLayout = (page: any) => (<DashboardLayout>{page}</DashboardLayout>);

export default Page;
