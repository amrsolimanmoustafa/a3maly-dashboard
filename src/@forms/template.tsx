import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  Box,
  Stack,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"
import { SelectChangeEvent } from '@mui/material/Select'

const TemplateForm = (props: any) => {
  const { handleSubmit, editMode, open, onClose, record } = props
  const { t } = useTranslation()
  const [formState, setFormState] = useState<any>({
    id: Math.floor(Math.random() * 1032).toString(),
    templateName: "",
    departmentName: "",
    wordUsed: "",
    gptModel: "",
    fields: [],
    state: false,
  })
  useEffect(() => {
    if (editMode) {
      setFormState(record)
    } else {
      setFormState({
        id: Math.floor(Math.random() * 1032),
        templateName: "",
        departmentName: "",
        wordUsed: "",
        gptModel: "",
        fields: [],
        state: false,
      })
    }
  }, [record, editMode])
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormState({
      ...formState,
      [name]: value,
    })
  }
  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target
    setFormState({
      ...formState,
      [name]: value,
    })
  }

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {!editMode ? t('AddName', { name: t('Template') }) : t('EditName', { name: t('Template') })}
      </DialogTitle>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit()

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
                name="departmentName"
                value={formState?.departmentName}
                label={t("department name")}
                onChange={handleInputChange}
                required={true}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                name="departmentName"
                value={formState?.departmentName}
                label={t("department name")}
                onChange={handleInputChange}
                required={true}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                name="wordUsed"
                value={formState?.wordUsed}
                label={t("word used")}
                onChange={handleInputChange}
                required={true}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                name="gptModel"
                value={formState?.gptModel}
                label={t("gpt model")}
                onChange={handleInputChange}
                required={true}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
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

export default TemplateForm