import { useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  SvgIcon,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import React from "react";
import { IndexedList } from "@/components/indexed-list";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FaceIcon from "@mui/icons-material/Face";
import InfoIcon from '@mui/icons-material/Info';
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TranslateIcon from "@mui/icons-material/Translate";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PropTypes from "prop-types";
import { format } from 'date-fns';
import { useTranslation } from "react-i18next";

export const OfficeDetails = (props: any) => {
  const { t } = useTranslation();
  const { office, cityName } = props;
  const handleSubmit = useCallback((event: any) => {
    event.preventDefault();
  }, []);
  const userInfoList = [
    {
      icon: (
        <SvgIcon fontSize="small">
          <PhoneIcon />
        </SvgIcon>
      ),
      label: t("Phone"),
      value:<span dir="ltr">{office.phone}</span> ,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <MyLocationIcon />
        </SvgIcon>
      ),
      label: t("City"),
      value: cityName,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <LocationOnIcon />
        </SvgIcon>
      ),
      label: t("Address"),
      value: office.address,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
           <InfoIcon />
        </SvgIcon>
      ),
      label: t("Created at"),
      value: (new Date(office?.created_at).toLocaleDateString('en-GB')),
    },
  ];

  //mapping user.addresses to addresses list

  return (
    <>
      <Card>
        <CardHeader title={office.name}  />
        <Divider />
        <CardContent>
          <Grid container spacing={12} wrap="wrap">
            <Grid xs={12} sm={6} md={4}>
              <Stack spacing={1}>
                <IndexedList items={userInfoList} />
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </>
  );
};

OfficeDetails.prototype = {
  user: PropTypes.object,
};
