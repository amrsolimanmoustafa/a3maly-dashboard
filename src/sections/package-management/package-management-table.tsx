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
import { useRouter } from 'next/router';

const PackageManagementTable = (props: any) => {
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
                <TableCell >{t("Name En")}</TableCell>
                <TableCell>{t("Name Ar")}</TableCell>
                <TableCell>{t("Price")}</TableCell>
                <TableCell>{t("No of Words")}</TableCell>
                <TableCell sx={{textAlign:"center"}}>{t("Actions")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item: any) => {
                const isSelected = selected.includes(item?.id);
                const deleted_at = item?.deleted_at
                  ? format(Date.parse(item?.deleted_at), "dd/MM/yyyy")
                  : null;
                // const [checked, setChecked] = useState(user.deleted_at);
                const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                  // setChecked(event.target.checked);
                  handleSuspend(item.id);
                };
                return (
                  <TableRow hover key={item?.id} selected={isSelected}>
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

                    <TableCell>{item.name_en}</TableCell>
                    <TableCell>{item.name_ar}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell>{item.words}</TableCell>
                    <TableCell>
                      <Tooltip arrow placement="top" title="Edit">
                        <IconButton onClick={() => handleEdit(item)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip arrow placement="top" title="Delete">
                        <IconButton color="error" onClick={() => handleDelete(item)}>
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
}

export default PackageManagementTable