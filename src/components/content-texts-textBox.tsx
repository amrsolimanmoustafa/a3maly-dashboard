import {
  Box,
  Card,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
  Button,
  OutlinedInput,
  Grid,
  InputLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import MUIRichTextEditor, { TMUIRichTextEditorRef } from "mui-rte-fixed";
import React, { useState, useRef } from "react";
import { Components, createTheme as createMuiTheme, } from '@mui/material';
type Props = {
  handleSubmit: (formState: any) => void;
  intialArTitle?:any,
  intialArcontent?:any,
};

const TextBox = ({ handleSubmit,intialArTitle="", intialArcontent="" }: Props) => {
  const { t } = useTranslation();
  const [language, setLanguage] = useState<string>("ar");
  const [formState, setFormState] = useState<any>({
    imgfile: "",
  });
  const editor = useRef(null);
  const handleLanguageChange = (event: React.SyntheticEvent, language: string) => {
    setLanguage(language);
  };
  const { arTitle, arContent, enTitle, enContent, updateData, handleChange } = { arTitle: "", arContent:"",  enTitle:"",  enContent:"",  updateData:() => {},  handleChange: (x:any, y:any) => {} };

  const ref = useRef<TMUIRichTextEditorRef>(null);

  const handleClick = () => {
    ref.current?.save();
    updateData();
  };

  const handleFocus = () => {
    ref.current?.focus();
  };
 // handleUploadImage
 const fileInputRef = useRef<HTMLInputElement>(null);
 const handleReviewUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
   const file = event.target.files?.[0];

   if (file) {
     setFormState({...formState, imgfile: file });
     event.target.value = "" //Rest the input 
 };
}
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 1,
        }}
      >
        <Container maxWidth="xl">
          <Card sx={{ mt: 0 }}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={language}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleLanguageChange} aria-label="Languages Tabs">
                    <Tab sx={{ px: 1 }} label="Arabic" value="ar"  />
                    <Tab sx={{ px: 1 }} label="English" value="en" />
                  </TabList>
                </Box>
                <TabPanel sx={{ pt: 0 }} value="ar">
                  <Stack direction="row" alignItems={"center"} gap={1} sx={{ mt: 2 }}>
                    <Typography variant="h6">{t("Title")} :</Typography>
                    <OutlinedInput
                      value={arTitle}
                      onChange={(event) => handleChange(event.target.value, "arTitle")}
                    />
                  </Stack>
      

                  <Grid style={{ minHeight: '350px' }}>
                  <MUIRichTextEditor
                    defaultValue={arContent}
                    ref={ref}
                    label={`${t("Type something here...")}`}
                    onBlur={() => ref.current?.save()}
                    onSave={(data: any) => handleChange(data, "arContent")}
                    customControls={[
                      {
                        name: "my-style",
                        type: "inline",
                        inlineStyle: {
                          backgroundColor: "black",
                          color: "white",
                          minHeight:"500px !important"
                        }
                      }
                  ]}
                  />
                      </Grid>
                </TabPanel>

                <TabPanel sx={{ pt: 0, direction: "rtl" }} value="en">
                  <Stack direction="row" alignItems={"center"} gap={1} sx={{ mt: 2 }}>
                    <Typography variant="h6">Title :</Typography>
                    <OutlinedInput
                      value={enTitle}
                      onChange={(event) => handleChange(event.target.value, "enTitle")}
                    />
                  </Stack>
                  <Grid style={{ minHeight: '350px' }}>
                  <MUIRichTextEditor
                    defaultValue={enContent}
                    ref={ref}
                    label={`${"Type something here..."}`}
                    onBlur={() => ref.current?.save()}
                    onSave={(data: any) => handleChange(data, "enContent")}
                    customControls={[
                      {
                          name: "my-style",
                          type: "inline",
                          inlineStyle: {
                              backgroundColor: "black",
                              color: "white",
                              minHeight:"500px !important"
                          }
                      }
                  ]}
                  />
                  </Grid>
                </TabPanel>
              </TabContext>
              <Grid item xs={12} spacing={5} m={3} sx={{direction:`${language=="en" ?"rtl":"ltr"}` }}>
                  <InputLabel> {language=="ar" ? t("Infographic"): "Infographic"}</InputLabel>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleReviewUpload}
                  />
                  <Button
                    variant="outlined"
                    color="inherit"
                    sx={{ display: "flex", justifyContent: "start", mt: 1 }}
                    fullWidth
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {language=="ar" ? t("upload image"): "upload image"}
                  </Button>
                </Grid>
              <Button onClick={handleClick} sx={{ m: 3, mt: 3 }} variant="contained">
                {language=="ar" ? t("Save"): "Save"}
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
};
export default TextBox;
