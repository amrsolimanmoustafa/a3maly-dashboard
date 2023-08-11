import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Scrollbar } from "../../components/scrollbar";
import { getInitials } from "../../utils/get-initials";

import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import {  Delete, Edit } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import IconButton from "@mui/material/IconButton";

export const UsersTable = (props: any) => {
  const router = useRouter();
  const {
    count,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page,
    handleSuspend = () => {},
    handleEdit = () => {},
    handleDelete = () => {},
    rowsPerPage,
    selected,
    isAdmin = false,
  } = props;

  const { t } = useTranslation();

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items ? items.length > 0 && selected.length === items.length : false;
  const colerfullText = (text:string|null)=>{
    if(text!=null){
      if(text === "مشترك"){
        return "#198a19"
      }
      else if(text === "غير مشترك"){
        return "#c92e23"
      }
    }
  }
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table sx={{ whiteSpace: "nowrap" }}>
            <TableHead>
              <TableRow >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell >{t("Account name")}</TableCell>
                <TableCell>{t("NationalID")}</TableCell>
                <TableCell>{t("City")}</TableCell>
                <TableCell>{t("Phone")}</TableCell>
                <TableCell>{t("Groups")}</TableCell>
                <TableCell>{t("user category")}</TableCell>
                <TableCell>{t("Roles")}</TableCell>
                <TableCell>{t("Subscription status")}</TableCell>
                <TableCell>{t("Subscription package")}</TableCell>
                <TableCell>{t('State')}</TableCell>
                <TableCell sx={{textAlign:"center"}}>{t("Actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((user: any) => {
                const isSelected = selected.includes(user?.id);
                const deleted_at = user?.deleted_at
                  ? format(Date.parse(user?.deleted_at), "dd/MM/yyyy")
                  : null;
                // const [checked, setChecked] = useState(user.deleted_at);
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                  // setChecked(event.target.checked);
                  handleSuspend(user.id);
                };

                const handleRoute = (event: React.ChangeEvent<HTMLInputElement>) => {
                  if (isAdmin) {
                    router.push(`/admins/${user?.id}`);
                  } else {
                    router.push(`/users/${user?.account}`);
                  }
                };

                const handleRouteEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
                  router.push(`/admins/update-admin/${user?.id}`);
                };

                const showDetails = (user: any) => {
                  router.push(`/users/${user?.id}`);
                };

                return (
                  <TableRow hover key={user?.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(user.id);
                          } else {
                            onDeselectOne?.(user.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={user?.avatar}>{getInitials(user?.name)}</Avatar>
                        <Typography variant="subtitle2">{user?.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{user?.NationalID}</TableCell>
                    <TableCell>{user?.city}</TableCell>
                    <TableCell sx={{ direction: "rtl" }}>{user?.phone}</TableCell>
                    <TableCell>{user?.group}</TableCell>
                    <TableCell>{user?.user_category}</TableCell>
                    <TableCell>{user?.roles}</TableCell>
                    <TableCell sx={{color:`${colerfullText(user?.subscription_status)}`}}>{user?.subscription_status}</TableCell>
                    <TableCell >{user?.subscription_package}</TableCell>
                    <TableCell>
                      <Switch
                        checked={user?.state}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      {deleted_at}
                    </TableCell>
                    <TableCell>
                      <Tooltip sx={{ borderRadius: 0 }} arrow placement="top" title="Show details">
                        <IconButton onClick={() => showDetails(user)}>
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="top" title="Edit">
                        <IconButton onClick={() => handleEdit(user)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="top" title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(user)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        labelRowsPerPage={t("Rows Per Page")}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

UsersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  handleSuspend: PropTypes.func,
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  rowsPerPage: PropTypes.number,
  isAdmin: PropTypes.any,
  selected: PropTypes.array,
};