import PropTypes from "prop-types";
import { format } from "date-fns";
import {
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
import Avatar from "@mui/material/Avatar";
import { AddModerator, Delete, Edit } from '@mui/icons-material';
import React, { useState } from "react";
import { Scrollbar } from "../../components/scrollbar";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { dictionary } from "@/configs/i18next";

export type Group = {
  id: number;
  type: 'admin' | 'moderator' | 'financial';
  arName: string;
  enName: string;
  status: boolean;
  notes: string;
};
export const ContentTable = (props: any) => {
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
          <Table>
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
                <TableCell>{t(dictionary('Id'))}</TableCell>
                <TableCell>{t(('Text in Arabic'))}</TableCell>
                <TableCell>{t(('Text in English'))}</TableCell>
                <TableCell>{t("Icon")}</TableCell>
                <TableCell>{t("Actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item: any) => {
                const isSelected = selected.includes(item.id);
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                  // setChecked(event.target.checked);
                  handleSuspend(item.id);
                };

                const handleRoute = (event: React.ChangeEvent<HTMLInputElement>) => {
                  router.push(`/groups/${item.id}`);
                };
                return (
                  <TableRow hover key={item.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(item.id);
                          } else {
                            onDeselectOne?.(item.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{item?.id}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{item.arText}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Typography variant="subtitle2">{item.enText}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                      <Avatar
                      variant="rounded"
                        src={
                          typeof item?.icon == "string"
                            ? item?.icon
                            : URL.createObjectURL(item?.icon)
                        }
                        alt="Preview"
                        sx={{ width: "50px",height:"50px", objectFit: "cover",borderRadius: "15px",}}
                      />
                      </Stack>
                    </TableCell> 
                    {/* <TableCell>
                      <Switch
                        checked={item.state}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    </TableCell> */}
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: '1rem' }}>
                      <Tooltip arrow placement="top" title="Edit">
                        <IconButton onClick={()=>handleEdit(item)}>
                          <Edit/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="top" title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(item?.id)}>
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

ContentTable.propTypes = {
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
