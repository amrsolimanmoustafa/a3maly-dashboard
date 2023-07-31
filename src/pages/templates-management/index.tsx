import { DashboardLayout } from '@/layouts/dashboard/layout';
import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { DepartmentMangementSearch } from '@/sections/department-mangement/department-mangement-search';
import { usePageUtilities } from '@/hooks/use-page-utilities';
import DepartmentContextProvider from '@/contexts/departmentContext';
import GroupContextProvider from '@/contexts/group-context';
import useAlert from '@/hooks/useAlert';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelection } from '@/hooks/use-selection';
import { WordMangementTable } from '@/sections/department-mangement/word-mangement-table';
import ConfirmationPopup from '@/components/confirmation-popup';
import DepartmentForm from '@/@forms/department';
import { useTemplates } from '@/hooks/use-templates';
import { TemplateMangementSearch } from '@/sections/template-mangement/template-mangement-search';
import { TemplateMangementTable } from '@/sections/template-mangement/template-mangement-table';
import TemplatesContextProvider from '@/contexts/template-context';
import TemplateForm from '@/@forms/template';
import FieldsForm from '@/@forms/fields';

const Page = () => {
  const { t } = useTranslation();
  const templateContext = useTemplates();
  const { showAlert, renderForAlert } = useAlert();
  const [editMood, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [openField, setOpenField] = useState(false);
  const [record, setRecord] = useState<any>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const onClose = () => {
    setOpen(false);
  };
  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller } =
    usePageUtilities();

  const templatesIds: any[] | undefined = useMemo(
    () => templateContext?.templates?.map((template: any) => template.id),
    [templateContext?.templates]
  );

  const templatesSelection = useSelection(templatesIds);

  useEffect(() => {
    templateContext?.fetchTemplates(controller.page, controller.rowsPerPage, controller.filter);
  }, [controller])

  const handleSubmit = async (formdata: any) => {
    if (editMood) {
      // departmentContext?.EditUser(formdata);
      showAlert(t("Templates has been edited successfully").toString(), "success");
    } else {
      templateContext?.addTemplate(formdata);
      showAlert(t("Templates has been added successfully").toString(), "success");
    }
    (async () => {
      await setEditMode(false);
      await setRecord({});
    })();
    // setOpen(false);
  };

  const handleEditTemplate = (role: any) => {
    setRecord(role);
    setEditMode(true);
    setOpen(true);
  };

  const handleEditEditTemplate = (role: any) => {
    setRecord(role);
    setEditMode(true);
    setOpenField(true);
  };

  const handleAddTemplate = () => {
    setEditMode(false);
    setRecord({});
    setOpen(true);
  };

  const handleDeleteTEmplate = (role_id: string) => {
    setSelectedTemplateId(role_id);
    setOpenConfirm(true);
  };

  const DeleteTemplate = () => {
    setOpenConfirm(false);
    templateContext?.suspendTemplate(selectedTemplateId);
    showAlert(t("Template has been deleted successfully").toString(), "success");
  };

  return (
    <>
      <Head>
        <title>{t("Templates management")} | {t('app_name')}</title>
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
            confirmFuntion={DeleteTemplate}
            open={openConfirm}
            setOpen={setOpenConfirm}
          />
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{t("Templates management")}</Typography>
              </Stack>
              <Button
                onClick={() => {
                  handleAddTemplate();
                }}
                variant="contained"
                sx={{ borderRadius: 0.5 }}
              >
                {t("Add")}
              </Button>
            </Stack>
            <TemplateMangementSearch
              onSearchChange={handleSearch}
            />
            {(templateContext == undefined || templateContext?.count > 0) && (
              <TemplateMangementTable
                count={templateContext?.count}
                items={templateContext?.templates}
                onDeselectAll={templatesSelection.handleDeselectAll}
                onDeselectOne={templatesSelection.handleDeselectOne}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                onSelectAll={templatesSelection.handleSelectAll}
                onSelectOne={templatesSelection.handleSelectOne}
                openField={handleEditEditTemplate}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                selected={templatesSelection.selected}
                handleSuspend={templateContext?.suspendTemplate}
                handleEdit={handleEditTemplate}
                handleDelete={handleDeleteTEmplate}
              />
            )}
          </Stack>
        </Container>
        <TemplateForm
          handleSubmit={handleSubmit}
          editMood={editMood}
          open={open}
          onClose={onClose}
          record={record}
          formItem={"template"}
        />
        <FieldsForm
          handleSubmit={() => null}
          editMood={editMood}
          open={openField}
          onClose={onClose}
          record={record}
          formItem={"fields"}
        />
      </Box>
      {renderForAlert()}
    </>
  );
}

Page.getLayout = (page: any) => (
  <DashboardLayout>
    <TemplatesContextProvider>
      <GroupContextProvider>
        {page}
      </GroupContextProvider>
    </TemplatesContextProvider>
  </DashboardLayout>
);

export default Page;