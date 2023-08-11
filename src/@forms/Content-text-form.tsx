// ------This form for fees -----
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Avatar,
} from "@mui/material";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

import { AddModerator, Delete, Edit } from "@mui/icons-material";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";

const Form = (props: any) => {
  const { handleSubmit, editMood, open, onClose, record, formItem, width, height } = props;
  const { t } = useTranslation();
  // const cityContext = useCities();
  const [formState, setFormState] = useState<any>({
    arText: "",
    enText: "",
    icon: "",
  });

  // handleUploadImage
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null | undefined>(null);
  const handleReviewUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFormState({ ...formState, icon: file });
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      //logic
    }
  };

  useEffect(() => {
    (async () => {
      //fetch all data related to add user
      // await cityContext?.fetchCities(1, 100, "");
    })();
    if (editMood) {
      setFormState(record);
      // setFormState({...formState,start_at : new Date(formState.start_at).toLocaleDateString()});
    } else {
      setFormState({
        arText: "",
        enText: "",
        icon: "",
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
  const RestForm = () => {
    setFormState({
      arText: "",
      enText: "",
      icon: "",
    });
  };
  // const handleSelectChange = (event: SelectChangeEvent) => {
  //   const { name, value } = event.target;
  //   setFormState({
  //     ...formState,
  //     [name]: value,
  //   });
  // };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle textAlign="center">
          {!editMood ? t(`Add ${formItem}`) : t(`Edit ${formItem}`)}
        </DialogTitle>
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            handleSubmit(formState);
          }}
        >
          <DialogContent>
            <Stack
              sx={{
                width: "100%",
                minWidth: { xs: "300px", sm: "360px", md: "400px" },
                gap: 2,
              }}
            >
              <Box>
                <input
                  type="file"
                  accept={"image/*"}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleReviewUpload}
                  required

                />
                <InputLabel sx={{ mt: 2 }}>{!editMood ? t(`Add Image`) : t(`Edit Image`)}</InputLabel>
                <div style={{ maxWidth: "500px", overflow: "hidden", display: "flex", justifyContent: "center" }}>
                  {formState?.icon ?
                    <Avatar
                      variant="rounded"
                      src={
                        typeof formState?.icon == "string"
                          ? formState?.icon
                          : URL.createObjectURL(formState?.icon)
                      }
                      alt="Preview"
                      sx={{ cursor: "pointer", width: `${width}px`, marginTop: "20px", height: `${height}px`, objectFit: "cover", borderRadius: "15px", }}
                      onClick={() => fileInputRef.current?.click()}
                    />
                    : (
                      <AddToPhotosIcon
                        onClick={() => fileInputRef.current?.click()}
                        sx={{ width: "100px", marginTop: "20px", height: "100px", objectFit: "cover", borderRadius: "15px", color: "#ccc" }} />
                    )}
                </div>
              </Box>
              <Box>
                <Typography variant="body1">{t(("Text in Arabic"))}</Typography>
                <TextField
                  fullWidth
                  name="arText"
                  value={formState?.arText}
                  label={t("Name in Arabic")}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={4}
                />
              </Box>
              <Box>
                <Typography variant="body1">{t(("Text in English"))}</Typography>
                <TextField
                  fullWidth
                  label={t(("Text in English"))}
                  dir="ltr"
                  name="enText"
                  value={formState?.enText}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={4}
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
    </>
  );
};

export default Form;
