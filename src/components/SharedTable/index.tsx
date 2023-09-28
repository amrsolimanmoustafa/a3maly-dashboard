import GppGoodIcon from "@mui/icons-material/GppGood";
import AddIcon from "@mui/icons-material/Add";
import GppBadIcon from "@mui/icons-material/GppBad";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axiosClient from "@/configs/axios-client";
import { dictionary, TranslatedWord } from "@/configs/i18next";
import { queryClient } from "@/pages/_app";
import { AttachMoney, CreditCard, Preview } from "@mui/icons-material";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Button,
  Chip,
  IconButton,
  MenuItem,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  MaterialReactTable,
  MaterialReactTableProps,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_Row,
  MRT_SortingState,
  MRT_VisibilityState,
} from "material-react-table";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import ModalDelete from "./ModalDelete";
import { ModalCreate, ModalCreateEditColumnsSchema } from "./ModalCreate";
import { ZodSchema } from "zod";
import { isURL } from "./utils";

type SharedTableProps<T extends Record<string, any>> =
  MaterialReactTableProps<T>
  & {
    easyColumns?: (keyof T)[];
    nativeColumns?: MRT_ColumnDef<T>[];
    endpoint: string;
    customColumnOrder?: MRT_ColumnDef<T>["accessorKey"][];
    columnVisibility?: Partial<Record<NonNullable<MRT_ColumnDef<T>["accessorKey"]>, boolean>>;
    actions?: Partial<MRT_ColumnDef<T>>[];
    modalCreateColumns?: ModalCreateEditColumnsSchema<T>[];
    // modalCreateEditColumns?: ModalCreateEditColumnsSchema<T>[];
    zodValidationSchema?: ZodSchema;
    enableAddNewRow?: boolean;
    previewData?: {
      data: T[];
    };
  };

const SharedTable = <T extends Record<string, any>>(props: SharedTableProps<T>) => {
  const {
    endpoint,
    actions,
    modalCreateColumns,
    // modalCreateEditColumns,
    zodValidationSchema,
    enableAddNewRow,
    previewData,
  } = props;

  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const tableIdentifier = Array.from(
    new Set([
      endpoint,
      columnFilters,
      globalFilter,
      pagination.pageIndex,
      pagination.pageSize,
      // sorting,
    ]),
  );

  const { data, isError, isFetching, isLoading, refetch } = useQuery(
    tableIdentifier,
    async () => {
      if (previewData) return previewData.data;

      if (endpoint) {
        const fetchURL = new URL(endpoint);
        fetchURL.searchParams.set("page", `${pagination.pageIndex + 1}`);
        fetchURL.searchParams.set("size", `${pagination.pageSize}`);
        fetchURL.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
        fetchURL.searchParams.set("globalFilter", globalFilter ?? "");
        // fetchURL.searchParams.set("sorting", JSON.stringify(sorting ?? []));
        // branchId && fetchURL.searchParams.set("branch_id", branchId);

        return (await axiosClient.get(fetchURL.toString())).data;
      }
      throw new Error("endpoint is not provided");
    },
    {
      keepPreviousData: true,
    },
  );

  //modal
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string;
  }>({});

  const addNewRow = useMutation({
    mutationFn: (values: Record<string, any>) => {
      return axiosClient.post(endpoint, values);
    },
    onMutate: async () => {
      await queryClient.cancelQueries(tableIdentifier);
    },
    onSettled: () => {
      queryClient.invalidateQueries(tableIdentifier);
    },
    onError: (error, variables, context) => {
      //fallback
      queryClient.setQueryData(tableIdentifier, context);
    },
  });

  const deleteRow = useMutation({
    mutationFn: (id: string) => {
      const deleteURL = new URL(endpoint);
      // delete any query params
      deleteURL.search = "";
      return axiosClient.delete(`${deleteURL.toString()}${id}`);

      return axiosClient.delete(`${endpoint}/${id}`);
    },
    onMutate: async () => {
      await queryClient.cancelQueries(tableIdentifier);
    },
    onSettled: () => {
      queryClient.invalidateQueries(tableIdentifier);
    },
    onError: (error, variables, context) => {
      //fallback
      queryClient.setQueryData(tableIdentifier, context);
    },
  });
  const editRow = useMutation({
    mutationFn: (values: Record<string, any>) => {
      // remove all search params
      const editURL = new URL(endpoint);
      editURL.search = "";
      return axiosClient.patch(`${editURL.toString()}${itemToEdit?.id}`, values);
    },
    onMutate: async () => {
      await queryClient.cancelQueries(tableIdentifier);
    },
    onSettled: () => {
      queryClient.invalidateQueries(tableIdentifier);
    },
    onError: (error, variables, context) => {
      //fallback
      queryClient.setQueryData(tableIdentifier, context);
    },
  });

  const handleCreateNewRow = (values: Record<string, any>) => {
    console.log("values", values);
    addNewRow.mutate(values);
    setIsModalCreateOpen(false);
  };

  const handleSaveRowEdits: MaterialReactTableProps<T>["onEditingRowSave"] = async ({
    exitEditingMode,
    row,
    values,
  }) => {
    if (!Object.keys(validationErrors).length) {
      // tableData[row.index] = values;
      //send/receive api updates here, then refetch or update local table data for re-render
      // setTableData([...tableData]);
      setIsModalCreateOpen(false);
    }
  };

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const handleDeleteRow = useCallback(() => {
    deleteRow.mutate(itemToDelete?.id);
    setIsModalDeleteOpen(false);
  }, [setIsModalDeleteOpen, itemToDelete, deleteRow]);

  // edit row
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<Record<string, any> | null>(null);

  const handleEditRow = useCallback(
    (values: any) => {
      if (!values) {
        throw new Error("values can't be null");
      }
      console.log("values", values);

      editRow.mutate(values);
      setIsModalEditOpen(false);
    },
    [setIsModalEditOpen, editRow],
  );

  useEffect(() => {
    return () => {
      setIsModalEditOpen(false);
      setIsModalDeleteOpen(false);
      setIsModalCreateOpen(false);
      queryClient.cancelQueries(tableIdentifier);
      queryClient.removeQueries(tableIdentifier);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  let autoGeneratedColumns = null
  if (!props.columns && data?.data[0] && !props.easyColumns) {
    const keys = Object.keys(data?.data[0] ?? {});
    autoGeneratedColumns = keys.map((key) => defaultColumn(key, fromKeyToHeader(key) as TranslatedWord));
    autoGeneratedColumns = [...autoGeneratedColumns, ...(actions ?? [])];
  }

  let thisEasyColumns = null
  if (props.easyColumns) {
    thisEasyColumns =
      props.easyColumns?.map(
        (column) =>
          sharedTableColumns.find((sharedColumn) => sharedColumn.accessorKey === column) ?? defaultColumn(column as string, fromKeyToHeader(column as string) as TranslatedWord)
      ) ?? [];
    thisEasyColumns = [...thisEasyColumns, ...(actions ?? [])];
  }

  if (zodValidationSchema && data && !zodValidationSchema.safeParse(data).success) {
    console.error(zodValidationSchema.safeParse(data));
    return (
      <Box>
        <Typography> api response is not as expected</Typography>
        <Typography>{JSON.stringify(zodValidationSchema.safeParse(data))}</Typography>
      </Box>
    );
  }

  return (
    <>
      <MaterialReactTable
        // actions
        positionActionsColumn="last"
        renderRowActionMenuItems={({ row, table }) => [
          <MenuItem
            key="edit"
            onClick={() => {
              setItemToEdit(row.original);
              setIsModalEditOpen(true);
            }}
          >
            <Box display="flex" alignItems="center" gap={2} padding={1}>
              <Typography variant="body2">{dictionary("Edit")}</Typography>
              <EditIcon />
            </Box>
          </MenuItem>,

          <MenuItem
            key="delete"
            onClick={() => {
              setItemToDelete(row.original);
              setIsModalDeleteOpen(true);
            }}
          >
            <Box display="flex" alignItems="center" gap={2} padding={1}>
              <Typography variant="body2">{dictionary("Delete")}</Typography>
              <DeleteIcon />
            </Box>
          </MenuItem>,
        ]}
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        localization={{
          actions: dictionary("Actions"),
          rowsPerPage: dictionary("Rows per page"),
        }}
        // rest
        getRowId={(originalRow) => originalRow.id}
        //@ts-ignore
        data={data?.data ?? []}
        //@ts-ignore
        columns={autoGeneratedColumns ?? thisEasyColumns ?? props.columns ?? []}
        manualPagination
        enableColumnFilterModes
        positionToolbarAlertBanner="bottom"
        muiToolbarAlertBannerProps={
          isError
            ? {
              color: "error",
              children: "Error loading data",
            }
            : undefined
        }
        onColumnFiltersChange={setColumnFilters}
        onGlobalFilterChange={setGlobalFilter}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        enableSorting={false}
        enableColumnActions={false}
        rowCount={data?.meta?.total ?? 0}
        state={{
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isFetching || isLoading,
          sorting,
          globalFilter,
          columnFilters,
        }}
        initialState={{
          columnVisibility: (props?.columnVisibility ?? {}) as MRT_VisibilityState | undefined,
          pagination: {
            pageIndex: 0,
            pageSize: 10,
          },
        }}
        renderTopToolbarCustomActions={() => (
          <>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <Tooltip
                sx={{
                  borderRadius: "50%",
                }}
                arrow
                title="Refresh Data"
              >
                <IconButton onClick={() => refetch()}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>

              {enableAddNewRow && (
                <Button
                  color="primary"
                  startIcon={<AddIcon />}
                  variant="contained"
                  sx={{ borderRadius: 0.5 }}
                  onClick={() => setIsModalCreateOpen(true)}
                >
                  {dictionary("Add")}
                </Button>
              )}
            </Box>
          </>
        )}
        {...props}
      />

      <ModalDelete
        open={isModalDeleteOpen}
        onClose={() => setIsModalDeleteOpen(false)}
        title="Delete"
        handleSubmit={handleDeleteRow}
        item={itemToDelete?.name ?? itemToDelete?.name_en ?? itemToDelete?.name_ar ?? ""}
      />

      <ModalCreate<T>
        title="Add"
        columns={modalCreateColumns ?? []}
        open={isModalCreateOpen}
        onClose={() => setIsModalCreateOpen(false)}
        onSubmit={handleCreateNewRow}
      />

      <ModalCreate<T>
        title="Edit"
        columns={
          modalCreateColumns?.map((column) => ({
            ...column,
            prevValue: itemToEdit?.[column.accessorKey as any],
          })) ?? []
        }
        open={isModalEditOpen}
        onClose={() => setIsModalEditOpen(false)}
        onSubmit={handleEditRow}
      />
    </>
  );
};

export default SharedTable;

export const defaultColumn = (key: string, translatedHeader: TranslatedWord) => ({
  accessorKey: key,
  enableEditing: false,
  size: 50,
  header: dictionary(translatedHeader),
  enableClickToCopy: true,
  Cell: ({ row }: { row: MRT_Row }) => (
    <Typography variant="body2">
      {/* @ts-ignore */}
      {row.original[key] ?? "-"}
    </Typography>
  ),
});

const sharedTableColumns: MRT_ColumnDef<any>[] = [
  {
    accessorKey: "is_reviewed",
    header: dictionary("Is Reviewed"),
    Cell: ({ row }) => (
      <Stack sx={{ display: "flex", alignItems: "center" }}>
        <SvgIcon>
          {!!row.getValue("is_reviewed") ? <Preview color="success" /> : <Preview color="error" />}
        </SvgIcon>
      </Stack>
    ),
    enableEditing: false,
    size: 50,
    muiTableHeadCellProps: {
      align: "center",
    },
  },
  {
    accessorKey: "payment_method",
    header: dictionary("Payment Method"),
    Cell: ({ row }) => (
      <Stack sx={{ display: "flex", alignItems: "center" }}>
        <SvgIcon>
          {row.getValue("payment_method") === "CASH" ? (
            <AttachMoney color="success" />
          ) : (
            <CreditCard color="success" />
          )}
        </SvgIcon>
        <Typography variant="body2">{row.getValue("payment_method")}</Typography>
      </Stack>
    ),
    enableEditing: false,
    size: 50,
    muiTableHeadCellProps: {
      align: "center",
    },
  },
  {
    accessorKey: "created_at",
    header: dictionary("Created at"),
    Cell: ({ row }) => (
      <Typography variant="body2">
        {new Date(row.getValue("created_at")).toLocaleDateString()}
      </Typography>
    ),
    enableEditing: false,
    size: 50,
  },
  {
    accessorKey: "updated_at",
    header: dictionary("Updated at"),
    Cell: ({ row }) => (
      <Typography variant="body2">
        {new Date(row.getValue("updated_at")).toLocaleDateString()}
      </Typography>
    ),
    enableEditing: false,
    size: 50,
  },
  {
    id: "avatar",
    accessorKey: "avatar",
    header: dictionary("avatar"),
    enableEditing: false,
    Cell: ({ row }) => (
      <Image
        src={
          isURL(row.original.avatar)
            ? row.original.avatar
            : "/assets/avatars/avatar-placeholder.webp"
        }
        alt={row.original?.name_en ?? "image alt"}
        width={50}
        height={50}
      />
    ),
    size: 50,
  },
  {
    id: "logo",
    accessorKey: "logo",
    header: dictionary("Logo"),
    enableEditing: false,
    Cell: ({ row }) => (
      <Image
        src={
          isURL(row.original.logo) ? row.original.logo : "/assets/avatars/avatar-placeholder.webp"
        }
        alt={row.original?.name_en ?? "image alt"}
        width={50}
        height={50}
      />
    ),
    size: 50,
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: dictionary("Amount"),
    Cell: ({ row }) => amountTagHandler(row.original.amount as number),
  },
  {
    accessorKey: "is_active",
    header: dictionary("Status"),
    Cell: ({ row }) => (
      <SvgIcon>
        {!!row.getValue("is_active") ? (
          <GppGoodIcon color="success" />
        ) : (
          <GppBadIcon color="error" />
        )}
      </SvgIcon>
    ),
    enableEditing: false,
    size: 50,
  },
];

function fromKeyToHeader(input: string): string {
  const words = input.split("_");
  if (words.length === 0) {
    return "";
  }

  const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  const restOfWords = words.slice(1);

  return [firstWord, ...restOfWords].join(" ");
}

export const amountTagHandler = (amount: number) => {
  // if amount if positive then show green tag if not then show red tag
  return (
    <Chip
      label={amount}
      sx={{
        fontWeight: "bold",
      }}
      color={amount > 0 ? "success" : amount < 0 ? "error" : "default"}
    />
  );
};