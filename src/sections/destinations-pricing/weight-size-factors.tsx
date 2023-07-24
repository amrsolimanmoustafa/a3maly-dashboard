import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, TextField } from '@mui/material';
import React from 'react';
import { AccountProfile } from '../account/account-profile';
import { AccountProfileDetails } from '../account/account-profile-details';
import { DashboardLayout } from '../../layouts/dashboard/layout';
import { useTranslation } from "react-i18next";
import { sizes, weights } from '../../utils/const-data';
import InputAdornment from '@mui/material/InputAdornment';
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import NoCrashIcon from "@mui/icons-material/NoCrash";
import BanknotesIcon from "@heroicons/react/24/solid/BanknotesIcon";
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

const DestinationDetails = (props: any) => {
    const { formData, handleChange } = props;
    const title = "Weight & Size Factors";
    const { t } = useTranslation();
    return <Box>
        <Typography variant="h5">{t(title)}</Typography>

        <Grid container spacing={{ xs: 1, sm: 3 }} marginTop={1}>
            <Grid xs={12} md={6} lg={6}>
                <Box>
                    <Typography variant="h5" sx={{ p: 3, pb: 0 }}>{t('Size')}</Typography>
                    <Stack sx={{ p: { xs: 2, sm: 3 }, gap: 2 }}>
                        {sizes?.length>0 && sizes.map((size, index) => (
                            <Stack key={index} sx={{ gap: 1 }}>
                                <Typography variant="h6">{t(size)}</Typography>
                                <Typography variant="subtitle2">{t(`Shipping rate between two points for a ${size.toLowerCase()} size shipment`)}</Typography>
                                <TextField
                                    type={'number'}
                                    name={size}
                                    value={formData[size]}
                                    onChange={handleChange}
                                    id="outlined-basic"
                                    label={t('Price')}
                                    variant="outlined"
                                    sx={{ maxWidth: 400 }} />
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            </Grid>

            <Grid xs={12} md={6} lg={6}>
                <Box>
                    <Typography variant="h5" sx={{ p: 3, pb: 0 }}>{t('Weight')}</Typography>
                    <Stack sx={{ p: 3, gap: 2 }}>
                        {weights?.length>0 && weights.map((weight, index) => (
                            <Stack key={index} sx={{ gap: 1 }}>
                                <Typography variant="h6">{t(weight)}</Typography>
                                <Typography variant="subtitle2">{t(`Shipping rate between two points for a ${weight.toLowerCase()} weight shipment`)}</Typography>
                                <TextField
                                    type={'number'}
                                    name={weight}
                                    value={formData[weight]}
                                    onChange={handleChange}
                                    id="outlined-basic" label={t('Price')} variant="outlined" sx={{ maxWidth: 400 }} />
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            </Grid>

        </Grid>
    </Box>
};
export default DestinationDetails;
