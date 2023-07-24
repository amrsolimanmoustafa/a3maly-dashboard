import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import React from 'react';
import { COMPANY_INFORMATION_CONFIG } from './config';
import { UserType } from '@/@types/auth-user';
import { useAuth } from '@/hooks/use-auth';
import { useTranslation } from 'react-i18next';

export const CompanyProfileDetails = () => {
  const { t } = useTranslation();
  const context = useAuth();
  // const [office, setOffice] = useState<UserType>(context?.user);
  const [values, setValues] = useState(context?.user);
  console.log(values)
  const handleChange = useCallback(
    (event: any) => {
      if(event.target.name === 'shipping_office name'){
        setValues((prevState: any) => ({
          ...prevState,
          shipping_office : {...prevState.shipping_office, name: event.target.value}
        }));
      }
      else if (event.target.name === "phone") {
        setValues((prevState: any) => ({
          ...prevState,
          shipping_office: { ...prevState.shipping_office, phone: event.target.value },
        }));
      }
    },
    []
  );

  const handleSubmit = async (event: any) => {
    console.log("from submit")
      event.preventDefault();
      console.log(values);
      const body = {
        name: values.shipping_office.name,
        phone: values.shipping_office.phone,
      };
     const isupdated = await context?.updateOfficeInfo(body);
    };

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader={t("The information can be edited")} title={t("company details")} />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  // helperText="Please specify the company name"
                  label={t("Office Name")}
                  name="shipping_office name"
                  onChange={handleChange}
                  required
                  defaultValue={values?.shipping_office?.name}
                />
              </Grid>

              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("Phone")}
                  name="phone"
                  onChange={handleChange}
                  type="text"
                  defaultValue={values?.shipping_office.phone}
                  dir="ltr"
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" type="submit">
            {t("save details")}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
