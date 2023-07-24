import { useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField
} from '@mui/material';
import React from 'react';
import { useTranslation } from "react-i18next";
import { useAuth } from '@/hooks/use-auth';
import SnackBar from "@/components/SnackBar";
export const SettingsEmail = () => {
  const context = useAuth();
  const { t } = useTranslation();
  const [values, setValues] = useState({
    email: context?.user?.email,
    OTP: ''
  });
  const [loading, setLoading] = useState(true);

    // SnakBar
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [color, setColor] = useState("success");
    const [duration, setDuration] = useState(3000);
  
    const handleClose = () => {
      setOpen(false);
    };
   
  const handleChange = useCallback(
    (event: any) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = async (event: any) => {
      event.preventDefault();
      const isUpdated =  await context?.updateEmail(values);
      if(isUpdated){
        setMessage(`${t("Update Email succeed")}`);
        setColor("success");
        setDuration(2000);
        setOpen(!open);
      }
      else{
        setMessage(`${t("Update Email failed")}`);
        setColor("error");
        setDuration(2000);
        setOpen(!open);

      }
    };


  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader={t("Update Email")}
          title={t("Email")}
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >
            <TextField
              fullWidth
              label={t("Email")}
              name="email"
              onChange={handleChange}
              type="email"
              value={values.email}
            />
            <TextField
              fullWidth
              label={t("OTP")}
              name="OTP"
              onChange={handleChange}
              disabled={true}
              type="password"
              value={values.OTP}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit'>
           {t("Update")}
          </Button>
        </CardActions>
        <SnackBar message={message} open={open} handleClose={handleClose} color={color} duration={duration} />
      </Card>
    </form>
  );
};
