import React, { useState } from 'react';
import { IDestinationsPricing } from '@/@types/destinations-pricing';
import { useRouter } from 'next/router';
import { format } from "date-fns";
import {
  TableRow,
  TableCell,
  Checkbox,
  Typography, Stack, Avatar
} from '@mui/material';
import { MenuButton } from '@/components/button-menu';
import { useTranslation } from 'react-i18next';
import ConfirmationPopup from '@/components/confirmation-popup';
import { useDestinations } from '@/hooks/use-destinations';
import SuccessMessage from '@/components/success-message';
type TDestinationRowProps = {
  destination: IDestinationsPricing;
  selected: string[];
  onSelectOne?: (id: string) => void;
  onDeselectOne?: (id: string) => void;
  handleSuspend: (id: string) => void;
}

const DestinationRow = ({
  destination,
  selected,
  onSelectOne,
  onDeselectOne,
  handleSuspend,
}: TDestinationRowProps) => {
  const router = useRouter();
  // const isSelected = selected.includes(destination.id);
  // const created_at = format(Date.parse(destination.created_at), "dd/MM/yyyy");
 const Context = useDestinations();
  const { t } = useTranslation();
  const [openConf, setOpenConf] = useState(false)
  const [selectedDestinationPricing, setSelectedDestinationPricing] = useState<any>({})
   //Handling Success Dialog
   const [open, setOpen] = React.useState(false);
   const openDialog = () => {
     setOpen(true);
   };
   const closeDialog = () => {
     setOpen(false);
   };
   const dialogTitle = "Delete Destinations Pricing";
   const successMessage = "Destinations & Pricing Deleted successfully";
   const successFunction = async() => {
     await Context?.fetchDestinations(0,10)
    //  router.push("/destinations-pricing");
    closeDialog()
   };

  const ConfDeleteDestinationPricing = async () => {
    const isDeleted = await Context?.deleteDestinationsPricing(selectedDestinationPricing.id);
    if(isDeleted) {
      setOpen(false)
      setOpenConf(false)
      setSelectedDestinationPricing("")
      openDialog();
    }
    else{
      setOpen(false)
      console.log("error");
      setOpenConf(false)
    }
  }
  const handleRoute = (event: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/destinations-pricing/edit/${destination.id}`);
  };

  return (
    // <TableRow hover key={destination.id} selected={isSelected}>
    <TableRow hover key={destination.id}>     
      <TableCell padding="checkbox">
      <ConfirmationPopup message={t("Sure to Delete this DestinationPricing?") + ": " + t("From")  + " " + selectedDestinationPricing?.branch_a?.name   + " " + t("To") + " " + selectedDestinationPricing?.branch_b?.name} confirmFuntion={ConfDeleteDestinationPricing} open={openConf} setOpen={setOpenConf} />
        <Checkbox
          // checked={isSelected}
          onChange={(event) => {
            if (event.target.checked) {
              onSelectOne?.(destination.id);
            } else {
              onDeselectOne?.(destination.id);
            }
          }}
        />
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Typography variant="subtitle2">{destination.branch_a.name} الي {destination.branch_b.name}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack sx={{width: '50%'}} justifyContent="space-between" alignItems="center" direction="row" spacing={2}>
          <Typography justifyContent="space-between" variant="h6">{t("Small")}: </Typography>
          <Typography variant="subtitle2">{destination.small_package_cost}</Typography>
        </Stack>
        <Stack sx={{width: '50%'}} justifyContent="space-between" alignItems="center" direction="row" spacing={2}>
          <Typography variant="h6">{t("Medium")}: </Typography>
          <Typography variant="subtitle2">{destination.medium_package_cost}</Typography>
        </Stack>
        <Stack sx={{width: '50%'}} justifyContent="space-between" alignItems="center" direction="row" spacing={2}>
          <Typography variant="h6">{t("Large")}: </Typography>
          <Typography variant="subtitle2">{destination.large_package_cost}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <Stack sx={{width: '50%'}} justifyContent="space-between" alignItems="center" direction="row" spacing={2}>
          <Typography variant="h6">{t("Light")}: </Typography>
          <Typography variant="subtitle2" >{destination.light_package_cost_percentage_multiplier}</Typography>
        </Stack>
        <Stack sx={{width: '50%'}} justifyContent="space-between" alignItems="center" direction="row" spacing={2}>
          <Typography variant="h6">{t("Medium")}: </Typography>
          <Typography variant="subtitle2">{destination.medium_package_cost_percentage_multiplier}</Typography>
        </Stack>
        <Stack sx={{width: '50%'}} justifyContent="space-between" alignItems="center" direction="row" spacing={2}>
          <Typography variant="h6">{t("Heavy")}: </Typography>
          <Typography variant="subtitle2">{destination.heavy_package_cost_percentage_multiplier}</Typography>
        </Stack>
      </TableCell>
      <TableCell>
        <MenuButton
          items={[
            // { label: "View", onClick: handleRoute },
            // { label: "Edit", onClick: handleRoute },
            // { label: "Delete", onClick: handleRoute },
            { label: "Edit", onClick: handleRoute },
            { label: "Delete", onClick: ()=> {
              setSelectedDestinationPricing(()=>destination);
              setOpenConf(true)
            } },
          ]}
        />
      </TableCell>
      <SuccessMessage
                open={open}
                setOpen={setOpen}
                afterSuccess={successFunction}
                message={successMessage}
                title={dialogTitle}
              />
    </TableRow>
  )
};

export default DestinationRow;

