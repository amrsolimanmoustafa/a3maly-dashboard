// ------This form for Groups , user Categories and Roles -----
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import {
  Box,
  Container,
  Stack,
  Typography,
  Grid,
  Button,
  TextField,
  InputLabel,
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
} from "@mui/material";
import { AddModerator, Delete, Edit } from "@mui/icons-material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useGroup } from "@/hooks/use-groups";
import { useRole } from "@/hooks/use-role";
import { useUserCategory } from "@/hooks/use-userCategory";
import GroupContextProvider from "@/contexts/group-context";
//TODO: replace this with Bk-End-API (context provider)
const groups = ["الادارة المالية", "الأدمن", "المشرفين"];
const roles = ["المدن", "ادارة العمولات", "ادارة الاشتراكات"];
const categories = ["الادارة", "العملاء", "المندوبين", "الورش", "المتاجر","مستخدمين"];

const UserForm = (props: any) => {
  const { handleSubmit, editMood, open, onClose, record, formItem } = props;
  const groupContext = useGroup();
  const userCategoriesContext = useUserCategory();
  const rolesContext = useRole();
  const { t } = useTranslation();
  const [formState, setFormState] = useState<any>({
    id: Math.floor(Math.random() * 1032),
    name: "",
    user_category: "",
    NationalID: "",
    city: "",
    phone: "",
    telephone: "",
    email: "",
    group: "",
    roles: "",
    state: false,
  });
  useEffect(() => {
    (async () => {
      //fetch all data related to add user
      await groupContext?.fetchGroups(1, 100, "");
      await userCategoriesContext?.fetchUserCategories(1, 100, "");
      await rolesContext?.fetchRoles(1, 100, "");
    })();
    if (editMood) {
      setFormState(record);
    } else {
      setFormState({
        name: "",
        user_category: "",
        NationalID: "",
        city: "",
        phone: "",
        telephone: "",
        email: "",
        group: "",
        roles: "",
        subscription_package: "غير مشترك",
        subscription_status: "جديد",
        state: false,});
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
      name: "",
      user_category: "",
      NationalID: "",
      city: "",
      phone: "",
      telephone: "",
      email: "",
      group: "",
      roles: "",
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
                    name="name"
                    value={formState?.name}
                    label={t("Name")}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{ mt: 1, width: "100%" }}
                    name="NationalID"
                    value={formState?.NationalID}
                    label={t("NationalID")}
                    onChange={handleInputChange}
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{ mt: 1, width: "100%" }}
                    name="city"
                    value={formState?.city}
                    label={t("City")}
                    onChange={handleInputChange}
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{ mt: 1, width: "100%", direction: "rtl" }}
                    name="phone"
                    value={formState?.phone}
                    label={t("Phone")}
                    onChange={handleInputChange}
                    required
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{ mt: 1, width: "100%", direction: "rtl" }}
                    name="telephone"
                    value={formState?.telephone}
                    label={t("Telephone")}
                    onChange={handleInputChange}
                  />
                </Box>
                <Box>
                  <TextField
                    sx={{ mt: 1, width: "100%" }}
                    name="email"
                    value={formState?.email}
                    label={t("Email")}
                    onChange={handleInputChange}
                    required
                  />
                </Box>
                <Box sx={{ minWidth: 120, mt: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t("Groups")}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formState?.group}
                      label="group"
                      name="group"
                      onChange={handleSelectChange}
                      variant="outlined"
                      defaultValue={formState.group}
                      defaultChecked={formState.group}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: "24em",
                          },
                        },
                      }}
                    >
                      {groupContext?.groups?.map((group, i) => {
                        return (
                          <MenuItem key={i} value={group?.id}>
                            {group?.arName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
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
                      defaultValue={formState.roles}
                      defaultChecked={formState.roles}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: "24em",
                          },
                        },
                      }}
                    >
                      {roles?.map((role, i) => {
                        return (
                          <MenuItem key={i} value={role}>
                            {role}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 120, mt: 2 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">{t("user category")}</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formState?.user_category}
                      label="user_category"
                      name="user_category"
                      onChange={handleSelectChange}
                      variant="outlined"
                      defaultValue={formState.user_category}
                      defaultChecked={formState.user_category}
                      MenuProps={{
                        PaperProps: {
                          style: {
                            maxHeight: "24em",
                          },
                        },
                      }}
                    >
                      {categories?.map((cat, i) => {
                        return (
                          <MenuItem key={i} value={cat}>
                            {cat}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                    <FormControl>
                      <FormLabel id="demo-controlled-radio-buttons-group">{t(`Status`)}</FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        value={formState?.state} // Use the actual value from the state
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
                {!editMood ? t("Add") : t("Edit")}
              </Button>
              <Button onClick={onClose}>{t("Cancel")}</Button>
            </DialogActions>
          </form>
        </Dialog>
      </GroupContextProvider>
    </>
  );
};

export default UserForm;