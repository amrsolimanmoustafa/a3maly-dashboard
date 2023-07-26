import React, { useState } from "react";
import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ISelectOption } from "@/@types/ISelectOption";
import { TInput } from "@/@inputs/ConfigDialogInputs";
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
interface SelectHandlerProps {
  input: TInput;
  handleChange: (event: any) => void;
  styles: any;
}

const SelectHandler = ({ input, handleChange, styles }: SelectHandlerProps) => {
  const { t } = useTranslation();
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [managers, setManagers] = useState([]);
  const [categories, setCategories] = useState([]);

  return (
    <Box>
      {input.label && (
        <InputLabel className={styles.inputLabel} id={input.name} htmlFor={input.name}>
          {t(input.label)}
        </InputLabel>
      )}
      {(
        <Select
          id={input.name}
          className={styles.inputInput}
          name={input.name}
          fullWidth
          onChange={handleChange}
          defaultValue={input.value}
          defaultChecked={input.value}
          required={input.required}
          sx={
            input.selectIcon && {
              "& .MuiSvgIcon-fontSizeMedium": {
                marginInline: "10px",
              },
              "& .MuiOutlinedInput-input ": {
                marginLeft: "28px",
              },
            }
          }
          IconComponent={input.selectIcon}
        >
          {input.name === "roleName"
            ? roles &&
            roles.map((option: ISelectOption, index: number) => (
              <MenuItem key={option.id || index} value={option.value || option.name}>
                {option.name}
              </MenuItem>
            ))
            : input.name === "departmentID"
              ? departments &&
              departments.map((option: ISelectOption, index: number) => {
                return (
                  <MenuItem key={option.id || index} value={option.id || option.name}>
                    {option.name}
                  </MenuItem>
                );
              })
              : input.name === "categoryID"
                ? categories &&
                categories.map((option: ISelectOption, index: number) => (
                  <MenuItem key={option.id || index} value={option.id || option.name}>
                    {option.name}
                  </MenuItem>
                ))
                : input.name === "managerID"
                  ? managers &&
                  managers.map((option: ISelectOption, index: number) => (
                    <MenuItem key={option.id || index} value={option.id || option.value}>
                      {option.name}
                    </MenuItem>
                  ))
                  : input.name === "role"
                    ? roles &&
                    roles.map((option: ISelectOption, index: number) => (
                      <MenuItem key={option.id || index} value={option.value || option.name}>
                        {option.name}
                      </MenuItem>
                    ))
                    : input.appendList &&
                    input.appendList.map((option: ISelectOption, index: number) => (
                      <MenuItem
                        id={option.id}
                        key={option.id || index}
                        value={option.value || option.id || option.name}
                      >
                        {option.name}
                      </MenuItem>
                    ))}
          {input.children && input.children}
        </Select>
      )}
    </Box>
  );
};

export default SelectHandler;