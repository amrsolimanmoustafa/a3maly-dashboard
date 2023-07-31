import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { DashboardLayout } from "../../../layouts/dashboard/layout";
import { useRouter } from "next/router";
import { Container, Stack } from "@mui/system";
import Grid from "@mui/material/Grid";
import { useTranslation } from "react-i18next";
import { useMessages } from "@/hooks/use-messages";
import MessagesContextProvider from "@/contexts/messages-context";
import SnackBar from "@/components/SnackBar";
import { useNotifictions } from "@/hooks/use-notifications";


const Page = () => {
  const messageContext = useMessages();
  const { t } = useTranslation();
  const router = useRouter();
  const [userMessage, setUserMessage] = useState<any>();
  const [loading, setLoading] = useState(false);
  const NotificationContext = useNotifictions();
  const isSent = NotificationContext?.isSent;
  const [formState, setFormState] = useState({
    title: "",
    content: "",

  });

  // SnakBar
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("success");
  const [duration, setDuration] = useState(3000);

  const handleClose = () => {
    setOpen(false);
  };

  /*  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   setFormState({
   ...formState,
   sendVia: event.target.value,
   });
   }; */

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //call the addNotification from the context
    const res = await messageContext?.SendMessage(
      formState.title,
      formState.content
    );
    setMessage(res ? () => t("Success") : () => t("failed"));
    setColor(res ? "success" : "error");
    setDuration(2000);
    setOpen(!open);
    if (isSent) {
      //make it empty
      setFormState({

        title: "",
        content: "",
      });
    }
  };

  const fetchMessage = async () => {
    if (typeof router.query.id === "string") {
      //   await clientContext?.getClient(router.query.user_account);
      console.log(router.query.id)
      const message = messageContext?.Messages.find(message => message?.id?.toString() == router.query.id);
      setUserMessage(message);
    }
  };

  useEffect(() => {
    messageContext?.fetchMessages(10, 10, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const messageTitle = useCallback(() => {
    return userMessage ? userMessage.title : '';
  }, [userMessage]);

  const messageContent = useCallback(() => {
    return userMessage ? userMessage.content : '';
  }, [userMessage]);

  useEffect(() => {
    fetchMessage();
    console.log(messageContext?.Messages)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageContext?.Messages]);



  return (
    <>
      <Head>
        <title>{t("Messages")} | {t("app_name")}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >

        <Container maxWidth="xl">
          <Stack spacing={3} sx={{ my: "15px" }}>
            <Typography variant="h4">{t("Reply To Messages")}</Typography>
          </Stack>

          <Grid item xs={12}>

            <Card  elevation={0}>

              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {messageTitle()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {messageContent()}
                </Typography>
              </CardContent>

            </Card>
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1.5}>

              <Grid item xs={12} sm={8}>
                <Typography variant="body1">
                  {t(`Message Title`)}
                </Typography>
                <TextField
                  id="title_ar"
                  name="title_ar"
                  value={formState.title}
                  fullWidth
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={8}>
                <Typography variant="body1">
                  {t(`Message Content`)}
                </Typography>
                <TextField
                  multiline
                  rows={4}
                  id="text_ar"
                  name="text_ar"
                  value={formState.content}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={8} sm={8} sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Button type="submit" variant="contained" color="primary">
                  {t("Send")}
                </Button>
              </Grid>
            </Grid>
            {/* //SnakBar components */}
            <div>
              <SnackBar
                message={message}
                open={open}
                handleClose={handleClose}
                color={color}
                duration={duration}
              />
            </div>
          </form>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => (
  <DashboardLayout>
    <MessagesContextProvider>{page}</MessagesContextProvider>
  </DashboardLayout>
);

export default Page;