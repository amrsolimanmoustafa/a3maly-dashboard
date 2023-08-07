import { usePageUtilities } from '@/hooks/use-page-utilities'
import { DashboardLayout } from '../layouts/dashboard/layout'
import { useTranslation } from 'react-i18next'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import useAlert from '@/hooks/useAlert'
import { useSelection } from '@/hooks/use-selection'
import { Box, Button, Container, Stack, Typography } from '@mui/material'
import BasicTable from "@/components/basic-table"
import ConfirmationPopup from '@/components/confirmation-popup'
import DepartmentForm from '@/@forms/department'
const Page = () => {
  const { t } = useTranslation()
  const headers : any = [
    { name:t('Name En'), value:'nameEn' },
    { name:t('Name Ar'), value:'nameAr' },
    { name:t('No Of Words Used'), value:'numberOfWordsUsed' },
    { name:t('No of Templates'), value:'numberOfTemplates' },
    { name:t('Department state'), value:'state', type: 'switch' },
  ]
  const { showAlert, renderForAlert } = useAlert()
  const [editMode, setEditMode] = useState(false)
  const [open, setOpen] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [record, setRecord] = useState<any>(null)
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [items, setItems] = useState<any>({ 
    data: [
      {
        id: 1,
        nameEn: "Dep one",
        nameAr: "القسم الاول",
        numberOfWordsUsed: 22600,
        numberOfTemplates: 22,
        state: true,
      },
      {
        id: 2,
        nameEn: "Dep Two",
        nameAr: "القسم الثاني",
        numberOfWordsUsed: 1800,
        numberOfTemplates: 2,
        state: true,
      }
    ],
    meta: {
    count: 2
  } })
  const itemIds: any[] | undefined = useMemo(
    () => items.data?.map((item: any) => item.id),
    [items.data]
  )
  const itemSelection = useSelection(itemIds)
  const { handlePageChange, handleRowsPerPageChange, handleSearch, controller } =
    usePageUtilities()

  const handleSwitchChange = (item : any) => {
    items.data.find((x: any) => x.id == item.id)
  }
  const handleEditRecord = (role: any) => {
    setRecord(role)
    setEditMode(true)
    setOpen(true)
  }

  const handleAddRecord = () => {
    setEditMode(false)
    setRecord({})
    setOpen(true)
  }

  const handleDeleteRecord = (id: string) => {
    setSelectedRecord(id)
    setOpenConfirm(true)
  }

  const DeleteRecord = () => {
    setOpenConfirm(false)
    setItems({
      data: items.data.filter((item : any) => item.id !== selectedRecord), 
      meta: {count: items.meta.count-1}
    })
    showAlert(t("Department has been deleted successfully").toString(), "success")
  }
  const handleSubmit = async (formdata: any) => {
    if (editMode) {
      showAlert(t("Department has been edited successfully").toString(), "success")
    } else {
      showAlert(t("Department has been added successfully").toString(), "success")
    }
    (async () => {
      await setEditMode(false)
      await setRecord({})
    })()
    // setOpen(false)
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
            message={t("delete confirmation", {name: t('Department')})}
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
              items={items.data}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              count={items.meta?.count}
              page={controller.page}
              rowsPerPage={controller.rowsPerPage}
              handleSwitchChange={handleSwitchChange}
              // onSelectAll={itemSelection.handleSelectAll}
              // onSelectOne={itemSelection.handleSelectOne}
              // onDeselectAll={itemSelection.handleDeselectAll}
              // onDeselectOne={itemSelection.handleDeselectOne}
              // selected={itemSelection.selected}
              // selectable
              actions= {{handleEdit: handleEditRecord, handleDelete: handleDeleteRecord}}
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

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>

export default Page