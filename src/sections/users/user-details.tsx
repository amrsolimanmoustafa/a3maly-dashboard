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
          <PhoneIcon />
        </SvgIcon>
      ),
      label: t("Phone"),
      value: <span dir="ltr">{user.phone}</span>,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <EmailIcon />
        </SvgIcon>
      ),
      label: t("Email"),
      value: user.email,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <NoAccounts />
        </SvgIcon>
      ),
      label: t("Status"),
      value: user.is_active ? t("Active") : t("Banned"),
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <PersonAddIcon />
        </SvgIcon>
      ),
      label: t("Is Occupied"),
      value: user.is_occupied ? t("Occupied") : t("Avilable"),
    },
  ];
  const AdditionalUserInfoList = [
    {
      icon: (
        <SvgIcon fontSize="small">
          <InfoIcon />
        </SvgIcon>
      ),
      label: t("in_city"),
      value:  <SvgIcon fontSize="small">
      { user?.__setting__?.in_city?  <CheckIcon /> : <ClearIcon />  }
     </SvgIcon>,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <InfoIcon />
        </SvgIcon>
      ),
      label: t("out_city"),
      value:  
      <SvgIcon fontSize="small">
      { user?.__setting__?.out_city?  <CheckIcon /> : <ClearIcon />  }
     </SvgIcon>,
    },

    {
      icon: (
        <SvgIcon fontSize="small">
          <InfoIcon />
        </SvgIcon>
      ),
      label: t("is_online"),
      value: user?.__setting__?.is_online?t("is online"):t("is offline"),
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <InfoIcon />
        </SvgIcon>
      ),
      label: t("join_status"),
      value: t(user?.__setting__?.join_status),
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <InfoIcon />
        </SvgIcon>
      ),
      label: t("occupation_type"),
      value: user?.__setting__?.occupation_type?user?.__setting__?.occupation_type:"-",
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <InfoIcon />
        </SvgIcon>
      ),
      label: t("delivery"),
      value: <SvgIcon fontSize="small">
      { user?.__setting__?.delivery?  <CheckIcon /> : <ClearIcon />  }
     </SvgIcon>,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <InfoIcon />
        </SvgIcon>
      ),
      label: t("shipping"),
      value: 
      <SvgIcon fontSize="small">
       { user?.__setting__?.shipping?  <CheckIcon /> : <ClearIcon />  }
      </SvgIcon>,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <InfoIcon />
        </SvgIcon>
      ),
      label: t("transfers"),
      value: 
      <SvgIcon fontSize="small">
       { user?.__setting__?.transfers?  <CheckIcon /> : <ClearIcon />  }
      </SvgIcon>
      ,
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
        <CardHeader subheader={"#" + user.account} title={user.name} />
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
