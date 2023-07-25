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
  DialogTitle, InputLabel, MenuItem
} from '@mui/material';
import { AddModerator, Delete, Edit } from "@mui/icons-material";
import { useRole } from "@/hooks/use-role";
import { useUserCategory } from "@/hooks/use-userCategory";
import GroupContextProvider from "@/contexts/group-context";
import Select, { SelectChangeEvent } from '@mui/material/Select';

const FieldsForm = (props: any) => {
  const roles = ["TextField", "Select", "Radio Button", "TextArea"]
  const { handleSubmit, editMood, open, onClose, record, formItem } = props;
  const rolesContext = useRole();
  const { t } = useTranslation();
  const [formState, setFormState] = useState<any>({
    id: Math.floor(Math.random() * 1032),
    Type: "",
  });

  useEffect(() => {
    (async () => {
      await rolesContext?.fetchRoles(1, 100, "");
    })();
    if (editMood) {
      setFormState(record);
    } else {
      setFormState({
        type: "",
        });
    }
  }, [record, editMood]);
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
      type: "",

    });
  };

  return (
    <>
      <GroupContextProvider>
        <Dialog open={open}>
          <DialogTitle textAlign="center">
            {!editMood ? t(`Add ${formItem}`) : t(`Edit ${formItem}`)}
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
                <Box sx={{ minWidth: 120, mt: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t("Roles")}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formState?.roles}
                      label="roles"
                      name="roles"
                      onChange={handleSelectChange}
                      variant="outlined"
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: "24em",
                          },
                        },
                      }}
                    >
                      {roles.map((role, i) => {
                        return (
                          <MenuItem key={i} value={role}>
                            {role}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions sx={{ p: "1.25rem" }}>
              <Button
                type="submit"
                startIcon={<AddModerator />}
                variant="contained"
                sx={{ borderRadius: 0.5 }}
              >
                {!editMood ? t("Add") : t("Edit")}
              </Button>
              <Button onClick={onClose}>{t("Cancel")}</Button>
            </DialogActions>
          </form>
        </Dialog>
      </GroupContextProvider>
    </>
  )
}

export default FieldsForm;