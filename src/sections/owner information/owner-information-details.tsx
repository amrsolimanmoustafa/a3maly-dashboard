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
import { UserType } from '@/@types/auth-user';
import { useAuth } from '@/hooks/use-auth';
import { useTranslation } from 'react-i18next';
import SnackBar from "@/components/SnackBar";
export const OwnerProfileDetails = () => {
  const { t } = useTranslation();
  const context = useAuth();
  const [office, setOffice] = useState<UserType>(context?.user);
  const [values, setValues] = useState(context?.user);
  console.log(values)
  const handleChange = useCallback(
    (event: any) => {
      
          setValues((prevState: any) => ({
          ...prevState,
          [event.target.name]: event.target.value
        }));
  
    },
    []
  );
    // SnakBar
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState("success");
    const [duration, setDuration] = useState(3000);
  
    const handleClose = () => {
      setOpen(false);
    };
   
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("from submit")
    console.log(values)
    const body = {
      email: values.email,
      name: values.name
    };
     const isUpdated = await context?.updateInfo(body);
      if(isUpdated){
        setMessage(`${t("Update Name succeed")}`);
        setColor("success");
        setDuration(2000);
        setOpen(!open);
      }
      else{
        setMessage(`${t("Update Name failed")}`);
        setColor("error");
        setDuration(2000);
        setOpen(!open);
      }
    };

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader={t("The information can be edited")}
          title={t("Account Details")}
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  // helperText="Please specify the company name"
                  label={t("Name")}
                  name="name"
                  onChange={handleChange}
                  required
                  value={values?.name}
                />
              </Grid>

              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label={t("Email")}
                  name="email"
                  onChange={handleChange}
                  required
                  value={values?.email}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            {t('save details')}
          </Button>
        </CardActions>
        <SnackBar message={message} open={open} handleClose={handleClose} color={color} duration={duration} />
      </Card>
    </form>
  );
};
