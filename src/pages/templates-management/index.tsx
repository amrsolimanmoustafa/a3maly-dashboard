import { DashboardLayout } from "@/layouts/dashboard/layout"
import Head from "next/head"
import { useTranslation } from "react-i18next"
import { Box, Button, Container, Stack, Typography } from "@mui/material"
import { usePageUtilities } from "@/hooks/use-page-utilities"
import GroupContextProvider from "@/contexts/group-context"
import useAlert from "@/hooks/use-alert"
import React, { useEffect, useMemo, useState } from "react"
import ConfirmationPopup from "@/components/confirmation-popup"
import useTemplate from "@/hooks/use-templates"
import { TemplateMangementSearch } from "@/sections/template-mangement/template-mangement-search"
import TemplateContextProvider from "@/contexts/template-context"
import DepartmentContextProvider from "@/contexts/department-context"
import TemplateForm from "@/@forms/template"
import BasicTable from "@/components/basic-table"
import { ITemplate } from "@/@types/ITemplate"

const Page = () => {
  const { t } = useTranslation()
  const { templates, count, fetch, add, remove, edit, suspend } = useTemplate()
  const { showAlert, renderForAlert } = useAlert()
  const [editMode, setEditMode] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [record, setRecord] = useState<ITemplate | null>(null)
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("")
  const [openConfirm, setOpenConfirm] = useState<boolean>(false)
  const headers = [
    { name: t("Template En"), value: "name" },
    { name: t("Template Ar"), value: "nameAr" },
    { name: t("Department name"), value: "departmentName" },
    { name: t("GPT Model"), value: "gptModel" },
    { name: t("Words Used"), value: "wordsUsed" },
    { name: t("State"), value: "state", type: "switch" },
  ]
  const onClose = () => {
    setOpen(false)
  }
  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller } =
    usePageUtilities()

  const templatesIds: any[] | undefined = useMemo(
    () => templates?.map((template: any) => template.id),
    [templates]
  )

  useEffect(() => {
    fetch(controller.page, controller.rowsPerPage, controller.filter)
  }, [controller])

  const handleSubmit = async (formdata: any) => {
    if (editMode) {
      edit(formdata)
      showAlert(t("Templates has been edited successfully").toString(), "success")
    } else {
      add(formdata)
      showAlert(t("Templates has been added successfully").toString(), "success")
    }
    (async () => {
      await setEditMode(false)
      await setRecord(null)
    })()
    // setOpen(false)
  }

  const handleEditTemplate = (data: any) => {
    setRecord(data)
    setEditMode(true)
    setOpen(true)
  }

  const handleAddTemplate = () => {
    setEditMode(false)
    setRecord(null)
    setOpen(true)
  }

  const handleDeleteTemplate = (id: string) => {
    setSelectedTemplateId(id)
    setOpenConfirm(true)
  }

  const deleteTemplate = () => {
    setOpenConfirm(false)
    suspend(selectedTemplateId)
    showAlert(t("Template has been deleted successfully").toString(), "success")
  }

  const handleSwitchChange = (item: any) => {
    suspend(item.id)
  }

  return (
    <>
      <Head>
        <title>
          {t("Templates management")} | {t("app_name")}
        </title>
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
            confirmFuntion={deleteTemplate}
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
                  handleAddTemplate()
                }}
                variant="contained"
                sx={{ borderRadius: 0.5 }}
              >
                {t("Add")}
              </Button>
            </Stack>
            <TemplateMangementSearch onSearchChange={handleSearch} />
            {count > 0 && (
              <BasicTable
                headers={headers}
                items={templates}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                count={count}
                page={controller.page}
                rowsPerPage={controller.rowsPerPage}
                handleSwitchChange={handleSwitchChange}
                actions={{ handleEdit: handleEditTemplate, handleDelete: handleDeleteTemplate }}
              />
            )}
          </Stack>
        </Container>
        <TemplateForm
          handleSubmit={handleSubmit}
          editMode={editMode}
          open={open}
          onClose={onClose}
          record={record}
        />
      </Box>
      {renderForAlert()}
    </>
  )
}

Page.getLayout = (page: React.ReactNode) => (
  <DashboardLayout>
    <DepartmentContextProvider>
      <TemplateContextProvider>
        <GroupContextProvider>{page}</GroupContextProvider>
      </TemplateContextProvider>
    </DepartmentContextProvider>
  </DashboardLayout>
)

export default Page
