import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Stack,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  InputLabel,
  Checkbox,
} from "@mui/material";
import { AddModerator, Delete, Edit } from "@mui/icons-material";
import { useRole } from "@/hooks/use-role";
import { useUserCategory } from "@/hooks/use-userCategory";
import GroupContextProvider from "@/contexts/group-context";
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Form = (props: any) => {
  const { handleSubmit, editMode, open, onClose, record, formItem } = props;
  const rolesContext = useRole();
  const { t } = useTranslation();
  const [formState, setFormState] = useState<any>({
    id: Math.floor(Math.random() * 1032),
    textEn: "",
    textAr: "",
    param: "",
    isInput: false,
    inputName: "",
    inputLabel: "",
    typeId: "",
    templateId: "",
  });
  const promptTypes = [
    { id: '1a', name: 'My Project' },
    { id: '1a', name: 'My Product' },
    { id: '1a', name: 'Free Context' },
  ]
  useEffect(() => {
    (async () => {
      //fetch all data related to add user
      await rolesContext?.fetchRoles(1, 100, "");
    })();
    if (editMode) {
      setFormState(record);
    } else {
      setFormState({
        id: Math.floor(Math.random() * 1032),
        textEn: "",
        textAr: "",
        param: "",
        isInput: false,
        inputName: "",
        inputLabel: "",
        typeId: "",
        templateId: "",
      });
    }
  }, [record, editMode]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const RestForm = () => {
    setFormState({
      id: Math.floor(Math.random() * 1032),
      textEn: "",
      textAr: "",
      param: "",
      isInput: false,
      inputName: "",
      inputLabel: "",
      typeId: "",
      templateId: "",
    });
  };

  return (
    <>
      <GroupContextProvider>
        <Dialog open={open}>
          <DialogTitle textAlign="center">
            {!editMode ? t(`Add ${formItem}`) : t(`Edit ${formItem}`)}
          </DialogTitle>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit();

            }}
          >
            <DialogContent sx={{ maxHeight: "55vh" }}>
              <Stack
                sx={{
                  width: "100%",
                  minWidth: { xs: "300px", sm: "360px", md: "400px" },
                  gap: 2,
                }}
              >
                <Box>
                  <TextField
                    fullWidth
                    name="textEn"
                    value={formState?.textEn}
                    label={t("English Text")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    name="textAr"
                    value={formState?.textAr}
                    label={t("Arabic Text")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>
                <Box sx={{ minWidth: 120, mt: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel>{t("Prompt Type")}</InputLabel>
                    <Select
                      value={formState?.typeId}
                      label={t('Prompt Type')}
                      name="typeId"
                      onChange={handleSelectChange}
                      variant="outlined"
                      defaultValue={formState.typeId}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: "24em",
                          },
                        },
                      }}
                    >
                      {promptTypes.map((type, i) => {
                        return (
                          <MenuItem key={i} value={type.id}>
                            {type.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 120, mt: 2 }}>
                  <Checkbox
                    name="isInput"
                    value={formState?.isInput}
                    checked={formState?.isInput}
                    onChange={handleInputChange}
                  />
                </Box>
                {formState?.isInput && <Box>
                  <TextField
                    fullWidth
                    name="param"
                    value={formState?.param}
                    label={t("Param to be Replaced")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>}
                {formState?.isInput && <Box>
                  <TextField
                    fullWidth
                    name="inputLabel"
                    value={formState?.inputLabel}
                    label={t("Label")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>}
                {formState?.isInput && <Box>
                  <TextField
                    fullWidth
                    name="inputName"
                    value={formState?.inputName}
                    label={t("name")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>}
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: "1.25rem" }}>
              <Button
                type="submit"
                startIcon={<AddModerator />}
                variant="contained"
                sx={{ borderRadius: 0.5 }}
              >
                {!editMode ? t("Add") : t("Edit")}
              </Button>
              <Button onClick={onClose}>{t("Cancel")}</Button>
            </DialogActions>
          </form>
        </Dialog>
      </GroupContextProvider>
    </>
  );
}

export default Form;