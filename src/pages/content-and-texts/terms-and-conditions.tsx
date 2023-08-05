import { DashboardLayout } from "@/layouts/dashboard/layout";
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { Box, Container, Stack, Typography, Grid } from "@mui/material";
import SnackBar from "@/components/SnackBar";
import EditNoteIcon from '@mui/icons-material/Handshake';
import TextBox from "@/components/content-texts-textBox";
const Page = () => {
  const { t } = useTranslation();
  const title = "Terms and Conditions";

  // SnakBar
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("success");
  const [duration, setDuration] = useState(3000);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (formState: any) => {
    console.log(formState);
  };
  return (
    <>
      <Head>
        <title>{t(title)} | {t('app_name')}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={1}>
            <Stack direction="row" justifyContent="space-between" spacing={2} sx={{ mb: 2 }}>
              <Stack spacing={1}>
                <Typography variant="h4" sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <EditNoteIcon fontSize="large" />
                  {t(title)}
                </Typography>
              </Stack>
            </Stack>
            <Stack direction="row" justifyContent="space-between" spacing={4} sx={{ mb: 2 }}>
              <Typography variant="h6" sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {t("Enter content:") + " " + t("Terms and Conditions")}
              </Typography>
            </Stack>
            {/*TextBox of text-and-content */}
            <TextBox handleSubmit={handleSubmit}  />
          </Stack>
          <Grid sx={{ bgcolor: "#ffffff", width: "100%", borderRadius: 1, mt: 3 }}></Grid>
          <SnackBar
            message={message}
            open={open}
            handleClose={handleClose}
            color={color}
            duration={duration}
          />
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
