import { Edit, Delete } from '@mui/icons-material'
import { Box, Card, Checkbox, IconButton, Switch, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Tooltip } from '@mui/material'
import { t } from 'i18next'
import React from 'react'
import { Scrollbar } from './scrollbar'

type THeader = {
  name?: string | React.ReactNode,
  value: string,
  type?: "switch"
}

const basicTable = (props: any) => {
  const {
    count,
    headers = [],
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page,
    actions = {
      handleEdit: null,
      handleDelete: null,
    },
    handleSwitchChange,
    rowsPerPage,
    selected,
    selectable
  } = props
  const selectedSome = selected?.length > 0 && selected?.length < items.length
  const selectedAll = items ? items.length > 0 && selected?.length === items.length : false
  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table sx={{ whiteSpace: "nowrap" }}>
            <TableHead>
              <TableRow>
                {selectable && <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => event.target.checked ? onSelectAll?.() : onDeselectAll?.()}
                  />
                </TableCell>}
                {headers.map((h: THeader, index: number) => {
                  return (<TableCell key={index} >{h.name ?? h.value}</TableCell>)
                })}
                {actions && <TableCell sx={{ textAlign: "center" }}>{t("Actions")}</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item: any) => {
                const isSelected = selected?.includes(item?.id)
                return (
                  <TableRow hover key={item?.id} selected={isSelected}>
                    {selectable && <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          event.target.checked ? onSelectOne?.(item.id) : onDeselectOne?.(item.id)
                        }}
                      />
                    </TableCell>}
                    {headers.map((h: THeader, index: number) => {
                      if (h.type == 'switch') {
                        return (
                          <TableCell key={index}>
                            <Switch
                              checked={item[h.value]}
                              onChange={() => handleSwitchChange(item)}
                            />
                          </TableCell>
                        )
                      }
                      return (<TableCell key={index}>{item[h.value]}</TableCell>)
                    })}
                    {actions && <TableCell>
                      {actions.handleEdit && <Tooltip arrow placement="top" title="Edit">
                        <IconButton onClick={() => actions.handleEdit(item)}>
                          <Edit />
                        </IconButton>
                      </Tooltip>}
                      {actions.handleDelete && <Tooltip arrow placement="top" title="Delete">
                        <IconButton color="error" onClick={() => actions.handleDelete(item)}>
                          <Delete />
                        </IconButton>
                      </Tooltip>}
                    </TableCell>}
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
  )
}

export default basicTable
