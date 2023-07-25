import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const DepartmentMangementSearch = (props: any) => {
  const {
    filter,
    onSearchChange,

  } = props;
  const { t } = useTranslation();
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
    </Card>
  );
};

DepartmentMangementSearch.propTypes = {
  filter: PropTypes.string,
  onSearchChange: PropTypes.func,
};