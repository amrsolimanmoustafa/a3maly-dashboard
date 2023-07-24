import { useEffect, useState } from "react";
import Head from "next/head";
import { Avatar, Box, SvgIcon, Typography } from "@mui/material";
import { DashboardLayout } from "../../layouts/dashboard/layout";
import { useClient } from "@/hooks/use-clients";
import { useRouter } from "next/router";
import { Container, Stack } from "@mui/system";
import SecurityIcon from "@mui/icons-material/Security";
import { UserDetails } from "@/sections/users/user-details";
import { useTranslation } from "react-i18next";
import getConfig from "next/config";
import { useUser } from "@/hooks/use-users";
import UserContextProvider from "@/contexts/user-context";
const { website } = getConfig().publicRuntimeConfig;

const Page = () => {
  const userContext = useUser();
  const { t } = useTranslation();
  const clientContext = useClient();
  const router = useRouter();
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    if (typeof router.query.id === "string") {
      //   await clientContext?.getClient(router.query.user_account);
      console.log(router.query.id)
      const user = userContext?.users.filter(user => user?.id?.toString() == router.query.id)[0];
      setUser(user);
    }
  };

  useEffect(() => {
    userContext?.fetchUsers(10, 10, "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    fetchUser();
    console.log(userContext?.users)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext?.users]);



  return (
    <>
      <Head>
        <title>{t("User details") + "|"  + website?.title}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <></>
        {!loading && user && (
          <Container maxWidth="lg">
            <Stack spacing={1}>
              <Stack
                justifyContent="space-between"
                alignItems="center"
                direction="row"
                spacing={3}
                sx={{ m: 3 }}
              >
                <Typography variant="h4">
                  {user?.name}
                  <Typography variant="body2">
                    <SvgIcon fontSize="small" color="primary">
                      <SecurityIcon />
                    </SvgIcon>
                    {t(user?.group)}
                  </Typography>
                </Typography>
                <Avatar sx={{ width: 150, height: 150 }}>
                  <img
                    src={user?.avatar||"https://blog.alliedmarketresearch.com/images/user_icon.png"}
                    srcSet={user?.avatar}
                    alt={user?.name}
                    loading="lazy"
                    width={200}
                  />
                </Avatar>
              </Stack>
              {/* <Stack spacing={3}>
               <Grid container spacing={3}>
               <Grid item xs={12} sm={6} lg={4}>
               <Stores difference={12} positive sx={{ height: "100%" }} value="$24k" />
               </Grid>
               <Grid item xs={12} sm={6} lg={4}>
               <Customers
               difference={16}
               positive={false}
               sx={{ height: "100%" }}
               value="1.6k"
               />
               </Grid>
               <Grid item xs={12} sm={6} lg={4}>
               <OverviewTasksProgress sx={{ height: "100%" }} value={75.5} />
               </Grid>
               </Grid>
               </Stack> */}

              <UserDetails user={user} />
            </Stack>
          </Container>
        )}
      </Box>
    </>
  );
};

Page.getLayout = (page: any) => (
  <DashboardLayout>
    <UserContextProvider>{page}</UserContextProvider>
  </DashboardLayout>
);

export default Page;