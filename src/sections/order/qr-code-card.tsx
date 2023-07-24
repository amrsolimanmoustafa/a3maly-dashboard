import QRCode from "react-qr-code";

import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Typography,
  Divider,
  CardActions,
  Button,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import axiosClient from "@/configs/axios-client";
import { features } from "process";
import JsFileDownloader from "js-file-downloader";

export const QrCodeCard = (props: any) => {
  const { id, orderNumber } = props;
  const { t } = useTranslation();
  const [PDF_Url, setPdf_url] = useState("");
  const pdfRef = useRef<any>(null);

  const handlePrint = async () => {
    const currentDate = new Date();

    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();

    const formattedDate = `${day}-${month}-${year}`;

    const fileNameFormat = `${orderNumber} ${formattedDate}.pdf`;

    if (id != null) {
      console.log(window.sessionStorage.getItem("token"));
      new JsFileDownloader({
        url: axiosClient.defaults.baseURL + `shipping-orders/${orderNumber}/download-qrcode`,
        headers: [{ name: "Authorization", value: "bearer "+window.sessionStorage.getItem("token")??"" }],
        filename: fileNameFormat,
      });
    }
  };
  return (
    <Card>
      <CardHeader title={t("QR Code")} />
      <CardContent sx={{ minHeight: 322 }}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
          }}
        >
          <QRCode
            size={50}
            style={{ height: "auto", minWidth: "35%",alignSelf: "center"}}
            value={id}
            viewBox={`0 0 50 50`}
          />
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <a
          style={{ display: "none" }}
          href={PDF_Url}
          aria-disabled={PDF_Url != ""}
          target="_blank"
          ref={pdfRef}
          download="download-qrcode.pdf"
          rel="noreferrer"
        ></a>
        <Button fullWidth variant="text" onClick={handlePrint}>
          {t("Print")}
        </Button>
      </CardActions>
    </Card>
  );
};
