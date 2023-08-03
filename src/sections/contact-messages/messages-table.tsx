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
import ReplyIcon from '@mui/icons-material/Reply';
import React, { useState } from "react";
import { Scrollbar } from "../../components/scrollbar";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export type message = {
  id: number;
  type: 'admin' | 'moderator' | 'financial';
  title: string;
  content: string;
  sender: string,
  status: boolean;
};
export const MessagesTable = (props: any) => {
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
                <TableCell>{t('Message Title')}</TableCell>
                <TableCell>{t('Message Content')}</TableCell>
                <TableCell>{t('The Sender')}</TableCell>
                <TableCell>{t("Message Status")}</TableCell>
                <TableCell>{t("Actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((message: any) => {
                const isSelected = selected.includes(message.id);
                const created_at = format(Date.parse(message.created_At), "dd/MM/yyyy");
                const deleted_At = message.deleted_At
                  ? format(Date.parse(message.deleted_At), "dd/MM/yyyy")
                  : null;
                // const [checked, setChecked] = useState(message.deleted_at);
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                  // setChecked(event.target.checked);
                  handleSuspend(message.id);
                };

                const handleRoute = (event: React.ChangeEvent<HTMLInputElement>) => {
                  router.push(`/technical-support/reply-to-message/${message.id}`);
                };
                return (
                  <TableRow hover key={message.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(message.id);
                          } else {
                            onDeselectOne?.(message.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell >
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2"   sx={{ overflow: 'hidden', textOverflow: 'ellipsis',maxWidth: 200   }}>{message?.title}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2"   sx={{ overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 200 }}>{message.content}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{message.sender}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={message.deleted_At == null}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      {deleted_At}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip arrow placement="left" title="Reply">
                          <IconButton onClick={()=>handleRoute(message?.id)}>
                            <ReplyIcon/>
                          </IconButton>
                        </Tooltip>
                        <Tooltip arrow placement="right" title="Delete">
                          <IconButton color="error" onClick={() => handleDelete(message?.id)}>
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
        labelRowsPerPage={t("Rows Per Page")}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

MessagesTable.propTypes = {
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