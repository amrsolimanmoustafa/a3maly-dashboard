import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import UserContextProvider from "@/contexts/user-context";
import GroupContextProvider from "@/contexts/group-context";
import { dictionary } from "@/configs/i18next";
import SharedTable from "@/components/SharedTable";
import { UsersTableApiResponse, UsersTableApiResponseZodSchema } from "@/@types/user";
import axiosClient from "@/configs/axios-client";
import { safeApiCall } from "@/utils";
import { toFormData } from "axios";
import { TemplatesTableApiResponse as BaseTemplatesTableApiResponse, TemplatesTableApiResponse, templatesTableApiResponseZodSchema } from "@/@types/template";

const Page = () => {
  const endpoint = "/templates";
  const getDataFn = async (endpointWithPaginationParams: string) => {
    const { data: response } = await safeApiCall<TemplatesTableApiResponse>({
      axiosFn: () => axiosClient.get(endpointWithPaginationParams),
      validationSchema: templatesTableApiResponseZodSchema,
    });
    const modifiedData = response.data.map((item) => {
      return {
        ...item,
        category_title_ar: item.category?.title_ar,
        category_title_en: item.category?.title_en,
      };
    }
    );
    return {
      ...response,
      data: modifiedData,
    }
  };

  // type TemplatesTableApiResponse = BaseTemplatesTableApiResponse["data"] & {
  //   category_name_ar: string;
  //   category_name_en: string;
  // }


  return (
    <>
      <Head>
        <title>
          {dictionary("Templates management")} | {dictionary("app_name")}
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
            <Typography variant="h4">{dictionary("Templates management")}</Typography>
            <SharedTable<TemplatesTableApiResponse["data"]>
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
                "icon",
                "title_ar",
                "title_en",
                "description_ar",
                "description_en",
                // @ts-ignore
                "category_title_ar",
                // @ts-ignore
                "category_title_en",
                "is_active",
                "created_at",
                "updated_at",
              ]}
              modalCreateColumns={[
                {
                  header: "avatar",
                  accessorKey: "avatar",
                  formElementType: "image",
                  imageBlob: true,
                  optional: true,
                },
                {
                  header: "Name",
                  accessorKey: "name",
                  formElementType: "text",
                },
                {
                  header: "password",
                  accessorKey: "password",
                  formElementType: "password",
                  disableEdit: true,
                },
                {
                  header: "Email",
                  accessorKey: "email",
                  formElementType: "email",
                },
                {
                  header: "Phone",
                  accessorKey: "phone",
                  formElementType: "phone",
                },
                {
                  header: "Role",
                  accessorKey: "role",
                  formElementType: "autocomplete",
                  options: [
                    {
                      title: "ADMIN",
                      value: "ADMIN",
                    },
                    {
                      title: "CLIENT",
                      value: "CLIENT",
                    },
                  ],
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