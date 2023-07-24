import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  SvgIcon,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { AddModerator, Delete, Edit } from '@mui/icons-material';
import React, { useState } from "react";
import { Scrollbar } from "../../components/scrollbar";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export type Message = {
  id: number;
  type: 'admin' | 'moderator' | 'financial';
  arMessage: string;
  enMessage: string;
  to: any;
  sendVia: any;
  status: boolean;

};
export const MessageFormsTable = (props: any) => {
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
    rowsPerPage,
    selected,
    handleEdit= () => {},
    handleDelete= () => {},
  } = props;

  const { t } = useTranslation();

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items ? items.length > 0 && selected.length === items.length : false;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table sx={{ whiteSpace: "nowrap"}}>
            <TableHead>
              <TableRow>
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
                <TableCell>{t('Id')}</TableCell>
                <TableCell>{t('Message In Arabic')}</TableCell>
                <TableCell>{t('Message In English')}</TableCell>
                <TableCell>{t("Recipients")}</TableCell>
                <TableCell>{t("send via")}</TableCell>
                <TableCell>{t("Status")}</TableCell>
                <TableCell>{t("Actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((form: any) => {
                const isSelected = selected.includes(form.id);
                const created_at = format(Date.parse(form.created_At), "dd/MM/yyyy");
                const deleted_at = form.deleted_At
                  ? format(Date.parse(form.deleted_At), "dd/MM/yyyy")
                  : null;
                // const [checked, setChecked] = useState(group.deleted_at);
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                  // setChecked(event.target.checked);
                  handleSuspend(form.id);
                };

                const handleRoute = (event: React.ChangeEvent<HTMLInputElement>) => {
                  router.push(`/groups/${form.id}`);
                };
                return (
                  <TableRow hover key={form.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(form.id);
                          } else {
                            onDeselectOne?.(form.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{form?.id}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell >
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2"   sx={{ overflow: 'hidden', textOverflow: 'ellipsis',maxWidth: 200   }}>{form?.arMessage}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2"   sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>{form?.enMessage}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{form?.to}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{form?.sendVia}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={form.deleted_At == null}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      {deleted_at}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip arrow placement="left" title="Edit">
                          <IconButton onClick={()=>handleEdit(form)}>
                            <Edit/>
                          </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Delete">
                          <IconButton color="error" onClick={() => handleDelete(form?.id)}>
                            <Delete/>
                          </IconButton>
                        </Tooltip>
                      </Box>
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
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

MessageFormsTable.propTypes = {
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
  selected: PropTypes.array,
};