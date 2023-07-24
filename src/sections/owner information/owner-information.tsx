import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import React , { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/use-auth";
import axiosClient from "@/configs/axios-client";


export const OwnerProfile = () => {
  const { t } = useTranslation();
  const context = useAuth();
  // handleUploadImage
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
     await context?.uploadImg(file)
    }
  }

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={context?.user?.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
        <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleAvatarUpload} />
          <Typography gutterBottom variant="h5">
            {context?.user?.username}
          </Typography>
          <Typography color="text.secondary" variant="body2">
            {context?.user?.account}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text" onClick={() => fileInputRef.current?.click()}>
          {t("upload image")}
        </Button>
      </CardActions>
    </Card>
  );
};
