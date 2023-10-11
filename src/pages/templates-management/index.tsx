import Head from "next/head";
import { Box, Container, Stack, Typography } from "@mui/material";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import GroupContextProvider from "@/contexts/group-context";
import { dictionary } from "@/configs/i18next";
import SharedTable from "@/components/SharedTable";
import { TemplatesTableZodSchema, TemplateTableApiResponse } from "@/@types/template";
import { CategoriesTableApiResponse, categoryZodSchema } from "@/@types/category";
import axiosClient from "@/configs/axios-client";
import { toFormData } from 'axios'
import { safeApiCall } from '@/utils'
import TemplatesContextProvider from "@/contexts/template-context";
import { useEffect, useState } from "react";

const Page = () => {
  const endpoint = "/templates";
  const getDataFn = async (endpointWithPaginationParams: string) => {
    const res = await safeApiCall<TemplateTableApiResponse>({
      axiosFn: () => axiosClient.get(endpointWithPaginationParams),
      validationSchema: TemplatesTableZodSchema,
    });
    return res.data;
  };
  const [categories, setCategories] = useState<Readonly<{ title: string; value: string; } | undefined>[]>([]);
  const getCategoriesFn = async () => {
    const res = await axiosClient.get('/categories/index')
    setCategories(_ => res.data.data.map((r: any) => {return {title: `${r.title_en} - ${r.title_ar}`, value: r.id}}));
  };
  useEffect(() => {
    (async () => {
      await getCategoriesFn();
    })();
  }, []);
  return (
    <>
      <Head>
        <title>
          {dictionary("Templates")} | {dictionary("app_name")}
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
            <Typography variant="h4">{dictionary("Templates")}</Typography>
            <SharedTable<TemplateTableApiResponse["data"]>
              endpoint={endpoint}
              getDataFn={
                ({
                  url: endpoint + "/index",
                  functionToPassUrl: getDataFn,
                })
              }
              addRowMutationFn={(values) => {
                return axiosClient.post(endpoint, values);
              }}
              editRowMutationFn={({ id, newData }) => {
                return axiosClient.post(`${endpoint}/update/${id}`, {
                  ...toFormData({
                    ...newData,
                    _method: "PATCH",
                  }),
                });
              }}
              deleteRowMutationFn={(id) => {
                return axiosClient.delete(`${endpoint}${id}`);
              }}
              identifyItemToBeDeletedBy="id"
              pageIndexParam="page"
              pageSizeParam="paginate"
              enableRowActions
              enableAddNewRow
              easyColumns={[
                "id",
                "title_en",
                "title_ar",
                "category_id",
                "is_active",
                "created_at",
                "updated_at",
              ]}
              modalCreateColumns={[
                {
                  header: "Icon",
                  accessorKey: "icon",
                  formElementType: "image",
                  imageBlob: true,
                },
                {
                  header: "Name",
                  accessorKey: "name",
                  formElementType: "text",
                },
                {
                  header: "Category",
                  accessorKey: "icon",
                  formElementType: "autocomplete",
                  options: categories
                },
                {
                  header: "Is active",
                  accessorKey: "is_active",
                  formElementType: "switch",
                },
                {
                  header: "Inputs",
                  accessorKey: "attributes",
                  formElementType: "form",
                  formInputs: [
                    {
                      header: "Is active",
                      accessorKey: "is_active",
                      formElementType: "switch",
                    },
                  ]
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
    <TemplatesContextProvider>
      <GroupContextProvider>{page}</GroupContextProvider>
    </TemplatesContextProvider>
  </DashboardLayout>
);

export default Page;