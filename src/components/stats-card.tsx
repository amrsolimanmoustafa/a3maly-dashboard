import {Box, Card, Grid, Stack, Typography} from '@mui/material';
import React from 'react';

interface Stats {
  icon: JSX.Element;
  name: string;
  value: number;
}

import { useTranslation } from 'react-i18next';

interface IStatsArray {
  data?: Stats[];
}

const StatsCard = ({data}: IStatsArray) => {
  const { t } = useTranslation();
  return (
    <>
      <Stack sx={{display: 'flex', justifyContent: 'flex-start', mt: 2}} gap={'20px'}>
        <Stack direction="row" sx={{display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap',}}
               gap={'20px'}>
          {data?.map(({icon, name, value}, index) => (
            <Grid
              key={index}
              sx={{minWidth: '259px', height: '98x'}}
            >
              <Card sx={{width: '100%', py: 3}}>
                <Box sx={{display: 'flex', alignItems: 'center', gap: '13px'}}>
                  <Box sx={{ml: 3, mr: 2}}>
                    {icon}
                  </Box>
                  <Box>
                    <Typography color="textPrimary" variant="h5" sx={{mr: 13}}>
                      {value}
                    </Typography>
                    {/*
                     // @ts-ignore */}
                    <Typography gutterBottom variant="currency">
                      {t(name)}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Stack>
      </Stack>
    </>
  );
}

export default StatsCard;