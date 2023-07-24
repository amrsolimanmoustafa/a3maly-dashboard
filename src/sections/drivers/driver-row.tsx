import React from "react";
import { format } from "date-fns";
import { Avatar, Checkbox, Stack, Switch, TableCell, TableRow, Typography } from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { MenuButton } from "@/components/button-menu";
import { useRouter } from "next/router";
import { IUser } from "@/@types/user";

const DriverRow = ({
  driver,
  selected,
  onSelectOne,
  onDeselectOne,
  handleSuspend,
}: {
  driver: IUser;
  selected: string[];
  onSelectOne?: (id: string) => void;
  onDeselectOne?: (id: string) => void;
  handleSuspend: (id: string) => void;
}) => {
  const router = useRouter();
  const isSelected = selected.includes(driver.id);
  const created_at = format(Date.parse(driver.created_at), "dd/MM/yyyy");
  const deleted_at = driver.deleted_at ? format(Date.parse(driver.deleted_at), "dd/MM/yyyy") : null;
  // const [checked, setChecked] = useState(user.deleted_at);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setChecked(event.target.checked);
    handleSuspend(driver.id);
  };

  const handleRoute = (event: React.ChangeEvent<HTMLInputElement>) => {
    router.push(`/drivers-management/driver/${driver.account}`);
  };

  return (
    <TableRow hover key={driver.id} selected={isSelected}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={isSelected}
          onChange={(event) => {
            if (event.target.checked) {
              onSelectOne?.(driver.id);
            } else {
              onDeselectOne?.(driver.id);
            }
          }}
        />
      </TableCell>
      <TableCell>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Avatar src={driver.avatar}>{getInitials(driver.name)}</Avatar>
          <Typography variant="subtitle2">{driver.name}</Typography>
        </Stack>
      </TableCell>
      <TableCell>{driver.phone}</TableCell>
      <TableCell>{created_at}</TableCell>
      <TableCell>
        <Switch
          checked={driver.deleted_at == null}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        {deleted_at}
      </TableCell>
      <TableCell>
        <MenuButton
          items={[
            { label: "View", onClick: handleRoute },
            // { label: "Edit", onClick: handleRoute },
            // { label: "Delete", onClick: handleRoute },
          ]}
        />
      </TableCell>
    </TableRow>
  );
};

export default DriverRow;
