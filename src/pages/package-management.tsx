import { DashboardLayout } from '../layouts/dashboard/layout'
import Head from 'next/head'
import { Box, Container, Stack, Typography } from '@mui/material'
import { dictionary } from '@/configs/i18next'
import { UsersTableApiResponse } from '@/@types/user'
import SharedTable from '@/components/SharedTable'
import axiosClient from '@/configs/axios-client'
import { PlanTableApiResponse, PlanTableApiResponseZodSchema } from '@/@types/plan'
import { safeApiCall } from '@/utils'
import { toFormData } from 'axios'

const Page = () => {
  const endpoint = "/plans";
  const getDataFn = async (endpointWithPaginationParams: string) => {
    const res = await safeApiCall<UsersTableApiResponse>({
      axiosFn: () => axiosClient.get(endpointWithPaginationParams),
      validationSchema: PlanTableApiResponseZodSchema,
    });
    return res.data;
  };

  return (
    <>
      <Head>
        <title>{dictionary("Package Management")} | {dictionary('app_name')}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4">{dictionary("Package Management")}</Typography>
            <SharedTable<PlanTableApiResponse["data"]>
              endpoint={endpoint}
              getDataFn={
                ({
                  url: endpoint + "/index",
                  functionToPassUrl: getDataFn,
                })
              }
              addRowMutationFn={(values) => {
                return axiosClient.post(`${endpoint}/store`, toFormData(values));
              }}
              editRowMutationFn={({ id, newData }) => {
                return axiosClient.patch(`${endpoint}/update/${id}`, {
                  ...toFormData({
                    ...newData,
                    _method: "PATCH",
                  }),
                });
              }}
              deleteRowMutationFn={(itemToDelete) => {
                return axiosClient.delete(`${endpoint}/delete/${itemToDelete.id}`);
              }}
              identifyItemToBeDeletedBy="title_ar"
              pageIndexParam="page"
              pageSizeParam="paginate"
              enableRowActions
              enableAddNewRow
              easyColumns={[
                "id",
                "title_ar",
                "title_en",
                "price_monthly",
                "price_annually",
                "features_ar",
                "features_en",
                "words_count",
                "created_at",
                "updated_at",
              ]}
              modalCreateColumns={[
                {
                  header: "Title ar",
                  accessorKey: "title_ar",
                  formElementType: "text",
                },
                {
                  header: "Title en",
                  accessorKey: "title_en",
                  formElementType: "text",
                },
                {
                  header: "Price monthly",
                  accessorKey: "price_monthly",
                  formElementType: "price",
                },
                {
                  header: "Price annually",
                  accessorKey: "price_annually",
                  formElementType: "price",
                },
                {
                  header: "Features ar",
                  accessorKey: "features_ar",
                  formElementType: "text",
                  multiline: true,
                },
                {
                  header: "Features en",
                  accessorKey: "features_en",
                  formElementType: "text",
                  multiline: true,
                },
                {
                  header: "Words count",
                  accessorKey: "words_count",
                  formElementType: "number",
                },
              ]}
              initialState={{
                columnVisibility: {
                  id: false,
                }
              }}
            />
          </Stack>
        </Container>
      </Box>
      {/* {renderForAlert()} */}
    </>
  )
}

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>

export default Page