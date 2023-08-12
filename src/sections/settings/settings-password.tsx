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
import SnackBar from "@/components/snack-bar";
export const SettingsPassword = () => { 
  const { t } = useTranslation();
   const context = useAuth();
  const [values, setValues] = useState({
    old_password: '',
    new_password: '',
    confirm: ''
  });
  const [atconfirmInput,setatconfirmInput] = useState(false)
  const errormsg = ()=>{
    if(values.confirm===values.new_password && atconfirmInput){
      return false;
    }
    return true;
  }
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
      if(event.target.name =="confirm"){
        setatconfirmInput(true)
      }
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = async(event: any) => {
      event.preventDefault();
      const ischange = await context?.changePassword(values.old_password, values.new_password);
      if(ischange){
        setMessage(`${t("Update Password succeed")}`);
        setColor("success");
        setDuration(2000);
        setOpen(!open);
        setValues({
          old_password: '',
          new_password: '',
          confirm: ''
        })
      }
      else{
        setMessage(`${t("Update Password failed")}`);
        setColor("error");
        setDuration(2000);
        setOpen(!open);

      }
    }
 
  

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader={t("Update password")}
          title={t("password")}
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >
            <TextField
              fullWidth
              label={t("old password")}
              name="old_password"
              onChange={handleChange}
              type="password"
              value={values.old_password}
            />
            <TextField
              fullWidth
              label={t("new password")}
              name="new_password"
              onChange={handleChange}
              type="password"
              value={values.new_password}
            />
            <TextField
              fullWidth
              label={t("new Password (Confirm)")}
              name="confirm"
              onChange={handleChange}
              type="password"
              value={values.confirm}
            />
           {(atconfirmInput && errormsg() ) && <span className='error' style={{color:"red"}}>{t("it doesn't match")}</span>}
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit' disabled={values.new_password == '' || values.confirm == '' || errormsg()}>
           {t("Update")}
          </Button>
        </CardActions>
        <SnackBar message={message} open={open} handleClose={handleClose} color={color} duration={duration} />
      </Card>
    </form>
  );
};
