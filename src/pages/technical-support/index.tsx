import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { DashboardLayout } from "@/layouts/dashboard/layout";
import { useSelection } from "@/hooks/use-selection";
import { useMessages } from "@/hooks/use-messages";
import { SearchBar } from "@/sections/shared/search-bar";
import { useTranslation } from "react-i18next";
import { usePageUtilities } from "@/hooks/use-page-utilities";
import { MessagesTable } from "@/sections/contact-messages/messages-table";

import MessagesContextProvider from "@/contexts/messages-context";
import useAlert from '@/hooks/use-alert';
import ConfirmationPopup from '@/components/confirmation-popup';
const Page = () => {
  const { t } = useTranslation();
  const title = t("technical support");
  const { showAlert, renderForAlert } = useAlert()
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [selectedMessageId, setselectedMessageId] = useState<string>("");
  const [openConfirm, setOpenConfirm] = useState(false)
  const onClose = () => {
    setOpen(false);
  };

  const messagesContext = useMessages();

  const ordersIds: any[] | undefined = useMemo(
    () =>
      messagesContext == undefined ? undefined : messagesContext?.Messages?.map((role: any) => role.id),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const ordersSelection = useSelection(ordersIds);

  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller } =
    usePageUtilities();

  useEffect(() => {
    messagesContext?.fetchMessages(controller.page, controller.rowsPerPage, controller.filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controller]);

  const handleSubmit = async (formdata: any) => {
    console.log(formdata);
    if (editMode) {
      messagesContext?.EditMessage(formdata);
      showAlert(t("Message has been edited successfully").toString(), "success");
    } else {
      messagesContext?.AddMessage(formdata);
      showAlert(t("Message has been added successfully").toString(), "success");
    }
    (async () => {
      await setEditMode(false);
      await setRecord({});
    })();
    setOpen(false);
  };

  const handleEditMessage =  (role: any) => {
    setRecord(role);
    setEditMode(true);
    setOpen(true);
  };

  const handleAddMessage =  () => {
    setEditMode(false);
    setRecord({});
    setOpen(true);
  };

  const handleDeleteMessage = (message: string) =>{
    setselectedMessageId(message);
    setOpenConfirm(true);
  }
  const DeleteMassage =  () => {
    setOpenConfirm(false);
    messagesContext?.DeleteMessage(selectedMessageId);
    showAlert(t("Message has been deleted successfully").toString(), "success");
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
          <ConfirmationPopup message={"Are you sure to delete this Message?"} confirmFuntion={DeleteMassage} open={openConfirm} setOpen={setOpenConfirm} />
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{t(title)}</Typography>
              </Stack>
              {/*   <Button
               onClick={() => {
               handleAddMessage();
               }}
               variant="contained"
               sx={{ borderRadius: 0.5 }}
               >
               {t(dictionary("Add"))}
               </Button> */}
            </Stack>
            <SearchBar onSearchChange={handleSearch} placeholder={t(`Search`) + " " + t(title)} />
            {(messagesContext == undefined || messagesContext?.count > 0) && (
              <MessagesTable
                count={messagesContext?.count}
                items={messagesContext?.Messages}
                onDeselectAll={ordersSelection.handleDeselectAll}
                onDeselectOne={ordersSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={ordersSelection.handleSelectAll}
                onSelectOne={ordersSelection.handleSelectOne}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                selected={ordersSelection.selected}
                handleSuspend={messagesContext?.suspendMessage}
                handleEdit={handleEditMessage}
                handleDelete={handleDeleteMessage}
              />
            )}
          </Stack>
        </Container>
        {
          //Add edit form Role
        }

      </Box>
      {renderForAlert()}
    </>
  );
};

Page.getLayout = (page: any) => (
  <DashboardLayout>
    <MessagesContextProvider>{page}</MessagesContextProvider>
  </DashboardLayout>
);

export default Page;