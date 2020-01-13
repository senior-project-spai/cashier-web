import React from 'react';
import './App.scss';
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
  Paper
} from '@material-ui/core'
import useWindowSize from './hooks/use-window-size'

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
    id: 'name',
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

function createData(barcode, name, price, quantity) {
  return { barcode, name, price, quantity };
}

const rows = [
  // 15 items
  createData(1234567890123, 'Namthip 600ML from Coca Cola Company Limited', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
  createData(1234567890123, 'Namthip 600ML', 6.50, 1),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

function App() {
  const classes = useStyles();
  const size = useWindowSize();
  return (
    <div className="App">
      <div className="User" style={{ minHeight: 150, maxHeight: 150, backgroundColor: "red" }}>
        <h1 style={{
          marginBlockStart: "0em",
          marginBlockEnd: "0em"
        }}>
          {size.width},{size.height}
        </h1>
      </div>
      <div className="ItemTable">
        <Paper className={classes.root}>
          <TableContainer className={classes.container} style={{ maxHeight: size.height - 150 }}>
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
                {rows.map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map(column => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
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
      </div>
    </div>
  );
}

export default App;
