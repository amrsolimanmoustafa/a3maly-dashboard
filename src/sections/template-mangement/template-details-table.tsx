import { format } from "date-fns";
import {
  Box,
  Card,
  Checkbox,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Chip,
  Button
} from "@mui/material";
import React from "react";
import { Scrollbar } from "../../components/scrollbar";

import { useTranslation } from "react-i18next";
import { Delete, Edit } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { WordMangementTable } from '@/sections/department-mangement/word-mangement-table';
import FieldsForm from '@/@forms/fields';
import { useRouter } from 'next/router';

export const TemplateMangementTable = (props: any) => {
  const {
    count,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    openField = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page,
    handleEdit = () => {},
    handleSuspend = () => {},
    handleDelete = () => {},
    rowsPerPage,
    selected,
  } = props;

  const { t } = useTranslation();
  const router = useRouter();

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items ? items.length > 0 && selected.length === items.length : false;

  const handleFields = (id: any) => {
    router.push(`/templates-management/fields/${id}`);
  }


  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table sx={{ whiteSpace: "nowrap" }}>
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
                <TableCell >{t("name")}</TableCell>
                <TableCell>{t("type")}</TableCell>
                <TableCell>{t("isInput")}</TableCell>
                <TableCell>{t("text en")}</TableCell>
                <TableCell>{t("text ar")}</TableCell>
                <TableCell sx={{textAlign:"center"}}>{t("Actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((template: any) => {
                const isSelected = selected.includes(template?.id);
                const deleted_at = template?.deleted_at
                  ? format(Date.parse(template?.deleted_at), "dd/MM/yyyy")
                  : null;
                // const [checked, setChecked] = useState(user.deleted_at);
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                  // setChecked(event.target.checked);
                  handleSuspend(template.id);
                };

                return (
                  <TableRow hover key={template?.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(template.id);
                          } else {
                            onDeselectOne?.(template.id);
                          }
                        }}
                      />
                    </TableCell>

                    <TableCell>{template?.templateName}</TableCell>
                    <TableCell>{template?.templateName}</TableCell>
                    <TableCell>{template?.wordUsed}</TableCell>
                    <TableCell>{template?.gptModel}</TableCell>
                    <TableCell><Button onClick={() => handleFields(template?.id)}>Fields</Button></TableCell>
                    <TableCell>
                      <Switch
                        checked={template?.state}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      {deleted_at}
                    </TableCell>
                    <TableCell>
                      <Tooltip arrow placement="top" title="Edit">
                        <IconButton onClick={() => handleEdit(template)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="top" title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(template)}>
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
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}