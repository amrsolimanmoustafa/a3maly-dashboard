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
} from "@mui/material";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
const Form = (props: any) => {
  const { handleSubmit, upload, Description } = props;
  const { t } = useTranslation();
  const [formState, setFormState] = useState<any>({
    description: Description,
    Mediafile: "",
  });

  // handleUploadImage
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const handleReviewUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFormState({ ...formState, Mediafile: file });
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      //logic
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={4}
        sx={{ mb: 2, width: "100%" }}
      >
        <Card
          sx={{
            width: "100%",
            border: "1px solid rgb(var(--neutral300-rgb,224,224,224))",
            borderRadius: "6px",
          }}
        >
          <form onSubmit={handleSubmit(formState)}>
          <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12}>
                  <InputLabel>{t("Infographic")}</InputLabel>
                  <input
                    type="file"
                    accept={upload=="image"?"image/*":"video/*"}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleReviewUpload}
                  />
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ display: "flex", justifyContent: "start", mt: 1 }}
                    fullWidth
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {upload == "image" ? t("upload image") : t("upload video")}
                  </Button>
                </Grid>
                {Description &&
                  <Grid item xs={12}>
                    <InputLabel>{t("Description")}</InputLabel>
                    <TextField
                      id="description"
                      name="description"
                      multiline
                      minRows={8}
                      value={formState.description}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </Grid>
                }
              </Grid>
              {/* it should be afterLoading to show preview */}
            {previewUrl && (
              <Grid item xs={12} spacing={5} >
              <InputLabel sx={{mt:2}}>{t("Preview")}</InputLabel>
              <div style={{maxWidth:"500px" }}>
                {formState?.Mediafile?.type?.includes("image") ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    style={{ width: "100%", marginTop: "20px",objectFit: "cover" }}
                    />
                    ) : (
                      <video src={previewUrl} controls style={{ width: "100%", marginTop: "20px",objectFit: "cover"  }} />
                      )}
              </div>
            </Grid>
            )}
          </CardContent>
          <CardActions sx={{ display: "flex", justifyContent: "end" }}>
            <Button size="large" type="submit">{t("Submit")}</Button>
          </CardActions>
            </form>
        </Card>
      </Stack>
    </>
  );
};

export default Form;
