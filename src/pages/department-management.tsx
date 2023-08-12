import { usePageUtilities } from '@/hooks/use-page-utilities'
import { DashboardLayout } from '../layouts/dashboard/layout'
import { useTranslation } from 'react-i18next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import useAlert from '@/hooks/use-alert'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import BasicTable from "@/components/basic-table"
import ConfirmationPopup from '@/components/confirmation-popup'
import DepartmentForm from '@/@forms/department'
import { IDepartment, INewDepartment } from '@/@types/department'
import useDepartment from '@/hooks/use-department'
import DepartmentContextProvider from '@/contexts/department-context'
const Page = () => {
  const { t } = useTranslation()
  const headers: any = [
    { name: t('Name En'), value: 'name' },
    { name: t('Name Ar'), value: 'nameAr' },
    { name: t('No Of Words Used'), value: 'numberOfWordsUsed' },
    { name: t('No of Templates'), value: 'numberOfTemplates' },
    { name: t('State'), value: 'state', type: 'switch' },
  ]
  const { showAlert, renderForAlert } = useAlert()
  const [editMode, setEditMode] = useState(false)
  const [open, setOpen] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [record, setRecord] = useState<IDepartment | null>(null)
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null)
  const { departments, count, fetch, add, edit, remove, suspend } = useDepartment()
  const departmentContext = useDepartment()
  const { handlePageChange, handleRowsPerPageChange, controller } = usePageUtilities()

  useEffect(() => {
    fetch(controller.page, controller.rowsPerPage, controller.filter)
    console.log(departmentContext?.departments)
  }, [])
  const handleSwitchChange = (item: any) => {
    suspend(item.id)
  }
  const handleEditRecord = (department: IDepartment) => {
    setRecord(department)
    setEditMode(true)
    setOpen(true)
  }

  const handleAddRecord = () => {
    setEditMode(false)
    setRecord(null)
    setOpen(true)
  }

  const handleDeleteRecord = (id: string) => {
    setSelectedRecord(id)
    setOpenConfirm(true)
  }

  const DeleteRecord = () => {
    setOpenConfirm(false)
    remove(selectedRecord!)
    showAlert(t("Department has been deleted successfully").toString(), "success")
  }
  const handleSubmit = async (formdata: IDepartment | INewDepartment) => {
    console.log(formdata)

    if (editMode) {
      edit(formdata)
      showAlert(t("Department has been edited successfully").toString(), "success")
    } else {
      add(formdata)
      showAlert(t("Department has been added successfully").toString(), "success")
    }
    (async () => {
      await setEditMode(false)
      await setRecord(null)
    })()
    setOpen(false)
  }
  return (
    <>
      <Head>
        <title>{t("Department Management")} | {t('app_name')}</title>
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
            message={t("delete confirmation", { name: t('Department') })}
            confirmFuntion={DeleteRecord}
            open={openConfirm}
            setOpen={setOpenConfirm}
          />
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{t("Department Management")}</Typography>
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
            <BasicTable
              headers={headers}
              items={departments}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              count={count}
              page={controller.page}
              rowsPerPage={controller.rowsPerPage}
              handleSwitchChange={handleSwitchChange}
              actions={{ handleEdit: handleEditRecord, handleDelete: handleDeleteRecord }}
            />
          </Stack>
        </Container>
        <DepartmentForm
          handleSubmit={handleSubmit}
          editMode={editMode}
          open={open}
          onClose={() => setOpen(false)}
          record={record}
        />
      </Box>
      {renderForAlert()}
    </>
  )
}

Page.getLayout = (page: any) =>
(<DashboardLayout>
  <DepartmentContextProvider>
    {page}
  </DepartmentContextProvider>
</DashboardLayout>)

export default Page