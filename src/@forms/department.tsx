
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
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
} from "@mui/material"
import { IDepartment, INewDepartment } from "@/@types/department"


const DepartmentForm = (props: any) => {
  const { handleSubmit, editMode, open, onClose, record } = props
  const { t } = useTranslation()
  const [formState, setFormState] = useState<INewDepartment | IDepartment>({
    id: Math.floor(Math.random() * 1032).toString(),
    name: "",
    nameAr: "",
    state: true
  })
  useEffect(() => {
    if (editMode) {
      setFormState(record)
    } else {
      setFormState({
        name: "",
        nameAr: "",
        state: true,
      })
    }
  }, [open])
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormState({
      ...formState,
      [name]: value,
    })
  }
  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {!editMode ? t("Add Department") : t("Edit Department")}
      </DialogTitle>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit(formState)
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
                name="name"
                value={formState.name}
                label={t("Department Name En")}
                onChange={handleInputChange}
                required={true}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                name="nameAr"
                value={formState.nameAr}
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
                    value={formState.state}
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
            variant="contained"
            sx={{ borderRadius: 0.5 }}
          >
            {!editMode ? t("Add") : t("Edit")}
          </Button>
          <Button onClick={onClose}>{t("Cancel")}</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default DepartmentForm