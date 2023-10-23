import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useTranslation } from "react-i18next";

export interface ITab {
  id: string;
  label: string;
  value: string;
  count?: any;
  content: JSX.Element;
}

export default function Tabs({
  tabs,
  sideButtons,
}: {
  tabs: ITab[];
  sideButtons?: any | undefined;
}) {
  const [value, setValue] = React.useState(tabs[0].value);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const { t } = useTranslation();

  return (
    <>
      <TabContext value={value}>
        {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Item One" value="1" />
                        <Tab label="Item Three" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">Item One</TabPanel>
                <TabPanel value="3">Item Three</TabPanel> */}
        <>
          <TabList
            sx={{ borderBottom: 1, borderColor: "#E8E8E8" }}
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            {tabs.map((tab, index) => {
              return (
                <Tab
                  key={index}
                  sx={{ fontSize: 18, mx: 2 }}
                  label={t(tab.label)}
                  value={tab.value}
                />
              );
            })}

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "10px",
                ml: "auto",
              }}
            >
              {sideButtons &&
                sideButtons.map(({ button }: any, index: string) => {
                  return <Box key={index}>{button}</Box>;
                })}
            </Box>
          </TabList>
        </>
        {tabs.map((tab, index) => {
          return (
            <TabPanel sx={{ p: 0 }} key={index} value={tab.value}>
              {tab.content}
            </TabPanel>
          );
        })}
      </TabContext>
    </>
  );
}