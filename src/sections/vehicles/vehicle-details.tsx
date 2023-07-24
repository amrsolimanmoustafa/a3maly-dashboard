import { useCallback } from "react";
import { format } from "date-fns";
import {
  Card,
  Box,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  SvgIcon,
  Unstable_Grid2 as Grid,
  Collapse,
  Typography,
  
} from "@mui/material";
import React from "react";
import { IndexedList } from "@/components/indexed-list";
import PropTypes from "prop-types";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import AbcIcon from "@mui/icons-material/Abc";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import AdjustIcon from "@mui/icons-material/Adjust";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ImageGallery from "@/components/image-gallery";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
export const VehicleDetails = (props: any) => {
  const { t } = useTranslation();
  const { vehicle,vehicleID } = props;

  const handleSubmit = useCallback((event: any) => {
    event.preventDefault();
  }, []);
  const vehicleInfoList = [
    {
      icon: (
        <SvgIcon fontSize="small">
          <DirectionsCarIcon />
        </SvgIcon>
      ),
      label: t("Brand"),
      value: vehicle?.brand_id,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <AdjustIcon />
        </SvgIcon>
      ),
      label: t("Model"),
      value: vehicle?.brand_model_id,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <FormatColorFillIcon />
        </SvgIcon>
      ),
      label: t("Color"),
      value: vehicle?.color,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <DepartureBoardIcon />
        </SvgIcon>
      ),
      label: t("Year"),
      value: vehicle?.year,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <AbcIcon />
        </SvgIcon>
      ),
      label: t("Plate"),
      value: vehicle?.plate,
    },
    {
      icon: (
        <SvgIcon fontSize="small">
          <EventAvailableIcon />
        </SvgIcon>
      ),
      label: t("License expiry date"),
      value: new Date(vehicle?.license_expire_at).toLocaleDateString('en-GB'),
    },
  ];
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const vehicleImages = vehicle?.__images__;
  const licenseImages = vehicle?.__license_images__;
  const galleryPath = "https://pronto.zbony.com/v1/";
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Card>
        <CardHeader  subheader={"#" + vehicle?.brand_model_id} title={vehicle?.brand_id} />
        <Divider />
        <CardContent>
          <Grid container spacing={12} wrap="wrap">
            <Grid xs={12} sm={6} md={4}>
              <Stack spacing={1}>
                <IndexedList items={vehicleInfoList} />
              </Stack>
            </Grid>
          </Grid>
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
        </CardContent>
        <Divider />
        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Box
                  sx={{
                    width: "100%",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <ImageGallery
                    path={galleryPath}
                    imagesArray={vehicleImages}
                    cols={3}
                    galleryTitle="Vehicle images"
                  />
                  <ImageGallery
                    path={galleryPath}
                    imagesArray={licenseImages}
                    cols={3}
                    galleryTitle="License Images"
                  />
                </Box>
        </CardContent>
      </Collapse>
      </Card>
    </Box>
  );
};

VehicleDetails.prototype = {
  vehicle: PropTypes.object,
};
