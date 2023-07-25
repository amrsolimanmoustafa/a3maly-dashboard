import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, Button, OutlinedInput, SvgIcon } from "@mui/material";
import React from "react";
import { saveAs } from 'file-saver';
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { MenuButton } from "@/components/button-menu";
import { writeFile, utils } from 'xlsx';
import { useUser } from '@/hooks/use-users';

export const UsersSearch = (props: any) => {
  const {
    filter,
    onSearchChange,
    handelfilterCategory=(query:string)=>{},
    handelfilterGroups=(query:string)=>{},
    handelfilterRoles=(query:string)=>{},
    categories=[],
    groups=[],
    roles=[],
  } = props;
  const { t } = useTranslation();

  const userContext = useUser();

  const handleExport = () => {
    const worksheet = utils.json_to_sheet(userContext?.users ?? []);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet 1');

    // Generate Excel file
    const excelBuffer = writeFile(workbook, 'Sheet.xlsx', { bookType: 'xlsx', type: 'array' });

    // Create a Blob from the buffer
    const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Trigger download
    saveAs(excelBlob, `Sheet.xlsx`);
  }

  return (
    <Card sx={{ p: 2 , display:"flex",gap:2,alignItems:"baseline" }}>
      <OutlinedInput
        defaultValue=""
        onChange={onSearchChange}
        fullWidth
        placeholder={`${t("Search")}`}
        value={filter}
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
        sx={{ maxWidth: 500 }}
      />
      <MenuButton
        items={[
          {
            label: t("All"),
            onClick: () => {
              handelfilterCategory("All");
            },
          },
          ...categories?.map((category: string) => ({
            label: category,
            onClick: () => {
              handelfilterCategory(category);
            },
          })),
        ]}
        title={"user category"}
      />

      <MenuButton
        items={[
          {
            label: t("All"),
            onClick: () => {
              handelfilterGroups("All");
            },
          },
          ...groups?.map((group: string) => ({
            label: group,
            onClick: () => {
              handelfilterGroups(group);
            },
          })),
        ]}
        title={"Groups"}
      />
      <MenuButton
        items={[
          {
            label: t("All"),
            onClick: () => {
              handelfilterRoles("All");
            },
          },
          ...roles?.map((role: string) => ({
            label: role,
            onClick: () => {
              handelfilterRoles(role);
            },
          })),
        ]}
        title={"Roles"}
      />
      <Button onClick={() => handleExport()}>
        {t('Export')}
      </Button>
    </Card>
  );
};

UsersSearch.propTypes = {
  filter: PropTypes.string,
  onSearchChange: PropTypes.func,
  handelfilterCategory: PropTypes.func,
  handelfilterGroups: PropTypes.func,
  handelfilterRoles: PropTypes.func,
  categories: PropTypes.array,
  groups: PropTypes.array,
  roles: PropTypes.array,
};