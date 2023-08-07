
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
} from "@mui/material";
import { AddModerator, Delete, Edit } from "@mui/icons-material";
import { useRole } from "@/hooks/use-role";
import { useUserCategory } from "@/hooks/use-userCategory";
import GroupContextProvider from "@/contexts/group-context";
import { SelectChangeEvent } from '@mui/material/Select';


const DepartmentForm = (props: any) => {
  const { handleSubmit, editMode, open, onClose, record } = props;
  const rolesContext = useRole();
  const { t } = useTranslation();
  const [formState, setFormState] = useState<any>({
    id: Math.floor(Math.random() * 1032),
    departmentName: "",
    templatesNumer: "",
    wordUsed: "",
    departmentOwner: "",
    state: true,
  });
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
        departmentName: "",
        templatesNumer: "",
        wordUsed: "",
        departmentOwner: "",
        state: true,
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
      departmentName: "",
      templatesNumer: "",
      wordUsed: "",
      departmentOwner: "",
      state: true,
    });
  };
  return(
    <>
      <GroupContextProvider>
        <Dialog open={open}>
          <DialogTitle textAlign="center">
            {!editMode ? t("Add Department") : t("Edit Department")}
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
                    sx={{ mt: 1, width: "100%" }}
                    name="nameEn"
                    value={formState?.nameEn}
                    label={t("Department Name En")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{ mt: 1, width: "100%" }}
                    name="nameAr"
                    value={formState?.nameAr}
                    label={t("Department Name Ar")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>
                <Box>
                  <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                    <FormControl>
                      <FormLabel>{t(`Status`)}</FormLabel>
                      <RadioGroup
                        value={formState?.state}
                        name="state"
                        onChange={handleInputChange}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label={t("Active")}
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label={t("Inactive")}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Stack>
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

export default DepartmentForm;