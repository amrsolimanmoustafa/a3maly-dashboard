import PropTypes from "prop-types";
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
} from "@mui/material";
import React from "react";
import { Scrollbar } from "../../components/scrollbar";

import { useTranslation } from "react-i18next";
import { Delete, Edit } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

export const WordMangementTable = (props: any) => {
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
    handleEdit = () => {},
    handleSuspend = () => {},
    handleDelete = () => {},
    rowsPerPage,
    selected,
  } = props;

  const { t } = useTranslation();

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items ? items.length > 0 && selected.length === items.length : false;

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
                <TableCell >{t("Department name")}</TableCell>
                <TableCell>{t("Templates Number")}</TableCell>
                <TableCell>{t("Number Of Used Word")}</TableCell>
                <TableCell>{t("Department State")}</TableCell>
                <TableCell sx={{textAlign:"center"}}>{t("Actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((department: any) => {
                const isSelected = selected.includes(department?.id);
                const deleted_at = department?.deleted_at
                  ? format(Date.parse(department?.deleted_at), "dd/MM/yyyy")
                  : null;
                // const [checked, setChecked] = useState(user.deleted_at);
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                  // setChecked(event.target.checked);
                  handleSuspend(department.id);
                };

                return (
                  <TableRow hover key={department?.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(department.id);
                          } else {
                            onDeselectOne?.(department.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{department?.departmentName}</TableCell>
                    <TableCell>{department?.departmentOwner}</TableCell>
                    <TableCell>{department?.templatesNumer}</TableCell>
                    <TableCell>{department?.wordUsed}</TableCell>
                    <TableCell>
                      <Switch
                        checked={department?.state}
                        onChange={handleChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      {deleted_at}
                    </TableCell>
                    <TableCell>
                      <Tooltip arrow placement="top" title="Edit">
                        <IconButton onClick={() => handleEdit(department)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="top" title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(department)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
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
}

WordMangementTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  handleEdit: PropTypes.func,
  handleSuspend: PropTypes.func,
  handleDelete: PropTypes.func,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};