import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import UserContextProvider from "@/contexts/user-context";
import GroupContextProvider from "@/contexts/group-context";
import { dictionary } from "@/configs/i18next";
import SharedTable from "@/components/SharedTable";
import users from "../../../public/endpoints/users.json";
import { User, UsersTableApiResponse, UsersTableApiResponseZodSchema } from "@/@types/user";
import axiosClient from "@/configs/axios-client";
import { safeApiCall } from "@/utils";

const Page = () => {
  const endpoint = "/users";
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
          {dictionary("Users")} | {dictionary("app_name")}
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
            <Typography variant="h4">{dictionary("Users")}</Typography>
            <SharedTable<UsersTableApiResponse["data"]>
              endpoint={endpoint}
              getDataFn={
                ({
                  url: endpoint + "/index",
                  functionToPassUrl: getDataFn,
                })
              }
              addRowMutationFn={(values) => {
                return axiosClient.post(`${endpoint}/store`, values);
              }}
              editRowMutationFn={({ id, newData }) => {
                return axiosClient.patch(`${endpoint}/${id}`, newData);
              }}
              deleteRowMutationFn={(itemToDelete) => {
                return axiosClient.delete(`${endpoint}/delete/${itemToDelete.id}`);
              }}
              identifyItemToBeDeletedBy="name"
              pageIndexParam="page"
              pageSizeParam="paginate"
              enableRowActions
              enableAddNewRow
              modalCreateReturnFormData
              modalEditReturnFormData
              easyColumns={[
                "id",
                "avatar",
                "name",
                "email",
                "phone",
                "role",
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