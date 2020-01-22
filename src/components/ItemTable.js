import React from "react";
import {  withStyles } from "@material-ui/core/styles";
import {
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table
} from "@material-ui/core";
import useWindowSize from '../hooks/use-window-size'

const BlackTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const columns = [
  {
    id: "barcode",
    label: "Barcode",
    minWidth: 50,
    maxWidth: 100,
    align: "left"
  },
  {
    id: "product_name",
    label: "Product Name",
    align: "left",
    minWidth: 200
  },
  {
    id: "price",
    label: "Price(THB)",
    minWidth: 25,
    align: "right",
    format: value => value.toFixed(2)
  },
  {
    id: "quantity",
    label: "Quantity",
    minWidth: 25,
    align: "right",
    format: value => value.toLocaleString()
  }
];


function ItemTable(props) {
  const size = useWindowSize();
  return (
    <TableContainer style={{
      maxHeight: size.height - 250
    }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <BlackTableCell
                key={column.id}
                align={column.align}
                style={{
                  minWidth: column.minWidth,
                  maxWidth: column.maxWidth
                }}
              >
                {column.label}
              </BlackTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.itemList.map(row => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                {columns.map(column => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === "number"
                        ? column.format(value)
                        : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ItemTable;
