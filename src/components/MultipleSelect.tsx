import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName?.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props:any) {
  const { t } = useTranslation();
  const theme = useTheme();
  const {label,styles,name,handleChange,formData}= props
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [categories, setCategories] = React.useState([]);

  const onchangeCat = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    handleChange(event)
  };

  return (
    <div>
      <InputLabel className={styles.inputLabel} id={name} >{t(label)}</InputLabel>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-name-label">{t(label)}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={formData?.categories?.length? personName : []}
          name={name}
          onChange={onchangeCat}
          input={<OutlinedInput label="Category" />}
          MenuProps={MenuProps}
          sx={{ outlineColor: "red", borderRadius: 0.5, height: 48 }}
          required={true}

        >
          {categories.map((category, index) => (
            <MenuItem key={index} value={index} style={getStyles(name, personName, theme)}>
              {"category.name"}

            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}