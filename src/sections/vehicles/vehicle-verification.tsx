import { useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Box,
  SvgIcon,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import React from "react";
import { IndexedList } from "@/components/indexed-list";
import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { useTranslation } from "react-i18next";

export const VehicleVerification = (props: any) => {
  const { t } = useTranslation();
  const [decision, setDecision] = React.useState("");
  const { vehicle } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDecision(event.target.value);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Card>
        <CardHeader title={t("Verification")} />
        <Divider />
        <CardContent>
          <Grid container spacing={12} wrap="wrap">
            <Grid xs={12} sm={6} md={4}>
              <Stack component="form" spacing={1}>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel>Decision</InputLabel>
                  <Select
                    value={decision}
                    label={t("Decision")}
                    onChange={(event: any) => {
                      handleChange(event);
                    }}
                  >
                    <MenuItem value="Accept">{t("Accept")}</MenuItem>
                    <MenuItem value="Reject">{t("Reject")}</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    </Box>
  );
};

VehicleVerification.prototype = {
  vehicle: PropTypes.object,
};
