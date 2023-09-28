import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import UserContextProvider from "@/contexts/user-context";
import GroupContextProvider from "@/contexts/group-context";
import { dictionary } from "@/configs/i18next";
import SharedTable from "@/components/SharedTable";
import users from "../../../public/endpoints/users.json";
import { User, UsersTableZodSchema } from "@/@types/user";

const Page = () => {
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
            <SharedTable<User>
              enableRowActions
              enableAddNewRow
              modalCreateColumns={[
                {
                  header: "avatar",
                  accessorKey: "avatar",
                  formElementType: "image",
                },
                {
                  header: "Name",
                  accessorKey: "name",
                  formElementType: "text",
                },
                {
                  header: "Email",
                  accessorKey: "email",
                  formElementType: "text",
                },
                {
                  header: "Phone",
                  accessorKey: "phone",
                  formElementType: "text",
                },
                {
                  header: "Roles",
                  accessorKey: "role",
                  formElementType: "autocomplete",
                  options: [
                    {
                      title: "Admin",
                      value: "admin",
                    },
                    {
                      title: "User",
                      value: "user",
                    },
                  ],
                },
                {
                  header: "Is active",
                  accessorKey: "is_active",
                  formElementType: "switch",
                },
              ]}
              endpoint="https://google.com"
              previewData={users as any}
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