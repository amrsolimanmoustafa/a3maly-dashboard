import { useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Box,
  Button,
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
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useDriver } from "@/hooks/use-drivers";

export const DriverVerification = (props: any) => {
  const { t } = useTranslation();
  const [decision, setDecision] = React.useState("");
  const { driver } = props;
  const driverContext = useDriver();
  const router = useRouter();
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDecision(event.target.value);
  };
  const handleDecision = () => {
    if(decision === 'Approve'){
      driverContext?.approveDriver(driver.id);
      router.push('/drivers-management/verification-requests');
    } else if (decision === 'Reject'){
      driverContext?.rejectDriver(driver.id);
      router.push('/drivers-management/verification-requests');
    }
  }
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
                  <InputLabel>{t('Decision')}</InputLabel>
                  <Select
                    value={decision}
                    label={t("Decision")}
                    onChange={(event: any) => {
                      handleChange(event);
                    }}
                  >
                    <MenuItem value="Approve">{t("Approve")}</MenuItem>
                    <MenuItem value="Reject">{t("Reject")}</MenuItem>
                  </Select>
                {decision && <Button onClick={handleDecision} variant="contained" sx={{mt: 2}}>{t('Confirm')}</Button>}
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

DriverVerification.prototype = {
  vehicle: PropTypes.object,
};
