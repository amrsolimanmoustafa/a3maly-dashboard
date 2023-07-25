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

const TemplateForm = (props: any) => {
  const { handleSubmit, editMood, open, onClose, record, formItem } = props;
  const rolesContext = useRole();
  const { t } = useTranslation();
  const [formState, setFormState] = useState<any>({
    id: Math.floor(Math.random() * 1032),
    templateName: "",
    departmentName: "",
    wordUsed: "",
    gptModel: "",
    fields: [],
    state: false,
  });
  useEffect(() => {
    (async () => {
      //fetch all data related to add user
      await rolesContext?.fetchRoles(1, 100, "");
    })();
    if (editMood) {
      setFormState(record);
    } else {
      setFormState({
        id: Math.floor(Math.random() * 1032),
        templateName: "",
        departmentName: "",
        wordUsed: "",
        gptModel: "",
        fields: [],
        state: false,
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
      id: Math.floor(Math.random() * 1032),
      templateName: "",
      departmentName: "",
      wordUsed: "",
      gptModel: "",
      fields: [],
      state: false,
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
                <Box>
                  <TextField
                    sx={{ mt: 1, width: "100%" }}
                    name="departmentName"
                    value={formState?.departmentName}
                    label={t("department name")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{ mt: 1, width: "100%" }}
                    name="departmentName"
                    value={formState?.departmentName}
                    label={t("department name")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{ mt: 1, width: "100%" }}
                    name="wordUsed"
                    value={formState?.wordUsed}
                    label={t("word used")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{ mt: 1, width: "100%" }}
                    name="gptModel"
                    value={formState?.gptModel}
                    label={t("gpt model")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{ mt: 1, width: "100%" }}
                    name="fields"
                    value={formState?.fields}
                    label={t("fields")}
                    onChange={handleInputChange}
                    required={true}
                  />
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
  );
}

export default TemplateForm;