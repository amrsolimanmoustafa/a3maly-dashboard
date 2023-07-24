import { useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  SvgIcon,
  Collapse,
  Box,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import React from "react";
import { IndexedList } from "@/components/indexed-list";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import NoAccounts from "@mui/icons-material/NoAccounts";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { styled } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from '@mui/icons-material/Info';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));
export const UserDetails = (props: any) => {
  const { t } = useTranslation();
  const { user } = props;
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleSubmit = useCallback((event: any) => {
    event.preventDefault();
  }, []);
  const userInfoList = [
    {
      icon: (
        <SvgIcon fontSize="small">
          <InfoIcon />
        </SvgIcon>
      ),
      label: t("NationalID"),
      value: user.NationalID,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <PhoneIcon />
        </SvgIcon>
      ),
      label: t("Phone"),
      value: <span dir="ltr">{user?.phone}</span>,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <PhoneIcon />
        </SvgIcon>
      ),
      label: t("Telephone"),
      value: <span dir="ltr">{user?.telephone}</span>,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <EmailIcon />
        </SvgIcon>
      ),
      label: t("Email"),
      value: user?.email,
    },

    {
      icon: (
        <SvgIcon fontSize="small">
          <InfoIcon />
        </SvgIcon>
      ),
      label: t("City"),
      value: user.city,
    },

  ];
  const AdditionalUserInfoList = [
    {
      icon: (
        <SvgIcon fontSize="small">
          <InfoIcon />
        </SvgIcon>
      ),
      label: t("user category"),
      value: user.user_category,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <InfoIcon />
        </SvgIcon>
      ),
      label: t("Roles"),
      value: user.roles,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <InfoIcon />
        </SvgIcon>
      ),
      label: t("Groups"),
      value: user.group,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <InfoIcon />
        </SvgIcon>
      ),
      label: t("Subscription package"),
      value: user.subscription_package,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <InfoIcon />
        </SvgIcon>
      ),
      label: t("Subscription status"),
      value: user.subscription_status,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <NoAccounts />
        </SvgIcon>
      ),
      label: t("Account state"),
      value: user?.state ? t("Active") : t("Banned"),
    },
  ];

  const addressesList = user.__addresses__
    ? user.__addresses__.map((address: any, index: number) => {
      return {
        icon: index + 1,
        label: address.name,
        value: address.address,
      };
    })
    : [];
  //mapping user.addresses to addresses list

  return (
    <div>
      <Card>
        <CardHeader subheader={"#" + user?.id} title={user?.name} />
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
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Divider />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Grid container spacing={12} wrap="wrap">
              <Grid xs={12} sm={6} md={4}>
                <Stack spacing={1}>
                  <IndexedList items={AdditionalUserInfoList} />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </Card>
      {addressesList.length > 0 && (
        <Card sx={{ mt: 2 }}>
          <CardHeader title={t("Addresses")} />
          <Divider />
          <CardContent>
            <Grid container spacing={12} wrap="wrap">
              <Grid xs={12} sm={6} md={4}>
                <Stack spacing={1}>
                  <IndexedList items={addressesList} />
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
        </Card>
      )}
    </div>
  );
};

UserDetails.prototype = {
  user: PropTypes.object,
};