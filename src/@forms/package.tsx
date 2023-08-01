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
import GroupContextProvider from "@/contexts/group-context";
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Form = (props: any) => {
  const { handleSubmit, editMode, open, onClose, record } = props;
  const rolesContext = useRole();
  const { t } = useTranslation();
  const [formState, setFormState] = useState<any>({
    id: Math.floor(Math.random() * 1032),
    name_en: "",
    name_ar: "",
    title_en: "",
    title_ar: "",
    price: "",
    words: 0,
    description_en: "",
    description_ar: "",
    features: []
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
        name_en: "",
        name_ar: "",
        title_en: "",
        title_ar: "",
        price: "",
        words: 0,
        description_en: "",
        description_ar: "",
        features: []
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
      name_en: "",
      name_ar: "",
      title_en: "",
      title_ar: "",
      price: 0,
      words: 0,
      description_en: "",
      description_ar: "",
      features: []
    });
  };

  return (
    <>
      <GroupContextProvider>
        <Dialog open={open}>
          <DialogTitle textAlign="center">
            {!editMode ? t(`Add Packages`) : t(`Edit Package`)}
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
                    name="name_en"
                    value={formState?.name_en}
                    label={t("English Name")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{ mt: 1, width: "100%" }}
                    name="name_ar"
                    value={formState?.name_ar}
                    label={t("Arabic Name")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{ mt: 1, width: "100%" }}
                    name="title_en"
                    value={formState?.title_en}
                    label={t("English Title")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{ mt: 1, width: "100%" }}
                    name="title_ar"
                    value={formState?.title_ar}
                    label={t("Arabic Title")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{ mt: 1, width: "100%" }}
                    name="price"
                    value={formState?.price}
                    type="number"
                    label={t("Package Price")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{ mt: 1, width: "100%" }}
                    name="words"
                    value={formState?.words}
                    label={t("Num of words")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{ mt: 1, width: "100%" }}
                    name="description_en"
                    value={formState?.description_en}
                    label={t("English Description")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{ mt: 1, width: "100%" }}
                    name="description_ar"
                    value={formState?.description_ar}
                    label={t("Arabic Description")}
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