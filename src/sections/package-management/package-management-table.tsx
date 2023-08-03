import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from 'next/router';
import BasicTable from "@/components/basic-table";

const PackageManagementTable = (props: any) => {
  const {
    count,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page,
    handleEdit = () => {},
    handleDelete = () => {},
    rowsPerPage,
    selected,
  } = props;

  const { t } = useTranslation();
  const headers : any = [
    { name:t('Name En'), value:'name_en' },
    { name:t('Name Ar'), value:'name_ar' },
    { name:t('Price'), value:'price' },
    { name:t('No of Words'), value:'words' },
  ]
  return (
    <BasicTable 
    count={count}
    headers={headers}
    items={items}
    onDeselectAll={onDeselectAll}
    onDeselectOne={onDeselectOne}
    onPageChange={onPageChange}
    onRowsPerPageChange={onRowsPerPageChange}
    onSelectAll={onSelectAll}
    onSelectOne={onSelectOne}
    page={page}
    actions= {{handleEdit: handleEdit, handleDelete: handleDelete}}
    rowsPerPage={rowsPerPage}
    selected={selected}
    selectable
    />
  );
}

export default PackageManagementTable