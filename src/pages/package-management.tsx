import { usePageUtilities } from '@/hooks/use-page-utilities'
import { DashboardLayout } from '../layouts/dashboard/layout'
import { useTranslation } from 'react-i18next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import useAlert from '@/hooks/useAlert'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import BasicTable from "@/components/basic-table"
import ConfirmationPopup from '@/components/confirmation-popup'
import PackageForm from '@/@forms/package'
import PackageContextProvider from '@/contexts/package-context'
import usePackage from '@/hooks/use-package'
import { INewPackage, IPackage } from '@/@types/package'
const Page = () => {
  const { t } = useTranslation()
  const headers: any = [
    { name: t('Name En'), value: 'name' },
    { name: t('Name Ar'), value: 'nameAr' },
    { name: t('Price'), value: 'price' },
    { name: t('No of Words'), value: 'words' },
    { name: t('State'), value: 'state', type: 'switch' },
  ]
  const { showAlert, renderForAlert } = useAlert()
  const { packages, count, fetch, add, edit, suspend, remove } = usePackage()
  const [editMode, setEditMode] = useState(false)
  const [open, setOpen] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [record, setRecord] = useState<IPackage | null>(null)
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null)
  const { handlePageChange, handleRowsPerPageChange, controller } = usePageUtilities()

  useEffect(() => {
    fetch(controller.page, controller.rowsPerPage, controller.filter)
  }, [controller.page])

  const handleEditRecord = (role: any) => {
    setRecord(role)
    setEditMode(true)
    setOpen(true)
  }

  const handleAddRecord = () => {
    setEditMode(false)
    setRecord(null)
    setOpen(true)
  }

  const handleSwitchChange = (item: IPackage) => {
    suspend(item.id)
  }
  const handleDeleteRecord = (id: string) => {
    setSelectedRecord(id)
    setOpenConfirm(true)
  }

  const DeleteRecord = () => {
    setOpenConfirm(false)
    remove(selectedRecord!)
    showAlert(t("Package has been deleted successfully").toString(), "success")
  }
  const handleSubmit = async (formdata: IPackage | INewPackage) => {
    if (editMode) {
      edit(formdata)
      showAlert(t("Package has been edited successfully").toString(), "success")
    } else {
      console.log(formdata)
      
      add(formdata)
      showAlert(t("Package has been added successfully").toString(), "success")
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
        <title>{t("Package Management")} | {t('app_name')}</title>
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
            message={"Are you sure to delete this Package?"}
            confirmFuntion={DeleteRecord}
            open={openConfirm}
            setOpen={setOpenConfirm}
          />
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">{t("Package Management")}</Typography>
              </Stack>
              <Button
                onClick={handleAddRecord}
                variant="contained"
                sx={{ borderRadius: 0.5 }}
              >
                {t("Add")}
              </Button>
            </Stack>
            <BasicTable
              headers={headers}
              items={packages}
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
  )
}

Page.getLayout = (page: React.ReactElement) =>
(<DashboardLayout>
  <PackageContextProvider>
    {page}
  </PackageContextProvider>
</DashboardLayout>)

export default Page