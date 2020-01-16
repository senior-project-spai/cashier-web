import React from 'react';
import {
  makeStyles,
  withStyles
} from '@material-ui/core/styles';
import {
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Paper,
} from '@material-ui/core'
import useWindowSize from '../hooks/use-window-size'

const BlackTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const columns = [
  {
    id: 'barcode',
    label: 'Barcode',
    minWidth: 50,
    maxWidth: 100,
    align: "left"
  },
  {
    id: 'product_name',
    label: 'ProductName',
    align: "left",
    minWidth: 200
  },
  {
    id: 'price',
    label: 'Price(THB)',
    minWidth: 25,
    align: 'right',
    format: value => value.toFixed(2),
  },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 25,
    align: 'right',
    format: value => value.toLocaleString(),
  }
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

function ItemTable(props) {
  const classes = useStyles();
  const size = useWindowSize();
  return (
    <Paper
      className={classes.root}
    >
      <TableContainer
        className={classes.container}
        style={{
          maxHeight: size.height - 200
        }}
      >
        <Table
          stickyHeader
          aria-label="sticky table"
        >
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
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.code}
                >
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        align={column.align}
                      >
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ItemTable;
