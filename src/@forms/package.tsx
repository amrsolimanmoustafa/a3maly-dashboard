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
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material"
import { INewPackage, IPackage } from "@/@types/package"

const Form = (props: any) => {
  const { handleSubmit, editMode, open, onClose, record } = props
  const { t } = useTranslation()
  const [formState, setFormState] = useState<IPackage | INewPackage>({
    id: Math.floor(Math.random() * 1032).toString(),
    name: "",
    nameAr: "",
    title: "",
    titleAr: "",
    price: 0,
    words: 0,
    description: "",
    descriptionAr: "",
    state: true,
    features: []
  })
  useEffect(() => {
    if (editMode) {
      setFormState(record)
    } else {
      setFormState({
        id: Math.floor(Math.random() * 1032).toString(),
        name: "",
        nameAr: "",
        title: "",
        titleAr: "",
        price: 0,
        words: 0,
        description: "",
        descriptionAr: "",
        state: true,
        features: []
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

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        {!editMode ? t('AddName', { name: t('Package') }) : t('EditName', { name: t('Package') })}
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
                label={t("English Name")}
                onChange={handleInputChange}
                required={true}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                name="nameAr"
                value={formState.nameAr}
                label={t("Arabic Name")}
                onChange={handleInputChange}
                required={true}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                name="title"
                value={formState.title}
                label={t("English Title")}
                onChange={handleInputChange}
                required={true}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                name="titleAr"
                value={formState.titleAr}
                label={t("Arabic Title")}
                onChange={handleInputChange}
                required={true}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                name="price"
                value={formState.price}
                type="number"
                label={t("Package Price")}
                onChange={handleInputChange}
                required={true}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                name="words"
                value={formState.words}
                type="number"
                label={t("Num of words")}
                onChange={handleInputChange}
                required={true}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                name="description"
                value={formState.description}
                label={t("English Description")}
                onChange={handleInputChange}
                required={true}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                name="descriptionAr"
                value={formState.descriptionAr}
                label={t("Arabic Description")}
                onChange={handleInputChange}
                required={true}
              />
            </Box>
            <Box>
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
            </Box>
            <Box>
            <TextField
                label={t("Arabic Description")}
                onChange={handleInputChange}
              />
              {formState.features}
              <ul>{formState.features.map((f:string, i:number) => (<li key={i}>{f}</li>))}</ul>
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

export default Form