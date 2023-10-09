import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import UserContextProvider from "@/contexts/user-context";
import GroupContextProvider from "@/contexts/group-context";
import { dictionary } from "@/configs/i18next";
import SharedTable from "@/components/SharedTable";
import { UsersTableApiResponse, UsersTableApiResponseZodSchema } from "@/@types/user";
import axiosClient from "@/configs/axios-client";
import { safeApiCall } from "@/utils";
import { toFormData } from "axios";
import { DashboardLayout } from "@/layouts/dashboard/layout";
import { CategoriesTableApiResponse } from "@/@types/category";

const Page = () => {
  const endpoint = "/categories";
  const getDataFn = async (endpointWithPaginationParams: string) => {
    const res = await safeApiCall<UsersTableApiResponse>({
      axiosFn: () => axiosClient.get(endpointWithPaginationParams),
      validationSchema: UsersTableApiResponseZodSchema,
    });
    return res.data;
  };

  return (
    <>
      <Head>
        <title>
          {dictionary("Categories")} | {dictionary("app_name")}
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
          <Stack spacing={3}>
            <Typography variant="h4">{dictionary("Categories")}</Typography>
            <SharedTable<CategoriesTableApiResponse["data"]>
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
                return axiosClient.post(`${endpoint}/update/${id}`,
                  toFormData({
                    ...newData,
                    _method: "PATCH",
                  }),
                );
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
                "is_active",
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
                  header: "Is active",
                  accessorKey: "is_active",
                  formElementType: "switch",
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