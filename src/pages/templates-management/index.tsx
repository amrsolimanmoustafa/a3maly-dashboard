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
import { useEffect, useState } from "react";
import { Category } from "@/@types/category";
import Scheme from "@/components/scheme";

const Page = () => {
  const [categories, setCategories] = useState<{
    title: string;
    value: string;
  }[]>([]);
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
        category_id: item.category?.title_ar,
      };
    }
    );
    return {
      ...response,
      data: modifiedData,
    }
  };

  const getCategories = async () => {
    const endpoint = "/categories/index";
    const { data: response } = await axiosClient.get(endpoint);
    const modifiedData = response.data.map((item: Category) => {
      return {
        title: item.title_ar,
        value: item.id,
      };
    }
    );
    return modifiedData;
  };

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });

    console.log("categories", categories);
  }, []);

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
                  header: "Icon",
                  accessorKey: "icon",
                  formElementType: "image",
                  imageBlob: true,
                  optional: true,
                },
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
                  header: "Description",
                  accessorKey: "description_ar",
                  formElementType: "text",
                  multiline: true,
                },
                {
                  header: "Description",
                  accessorKey: "description_en",
                  formElementType: "text",
                  multiline: true,
                },
                {
                  header: "Category",
                  accessorKey: "category_id",
                  formElementType: "autocomplete",
                  options: categories,
                },
                {
                  header: "Is active",
                  accessorKey: "is_active",
                  formElementType: "switch",
                },
                {
                  header: "Schemes",
                  accessorKey: "schemes",
                  customFormElement: (column) => {
                    return (
                      <Scheme data={column.prevValue ?? null} />
                    );
                  }
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