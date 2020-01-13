import React from 'react';
import {
  TextField, Button, Grid
} from '@material-ui/core'
import { useState } from 'react';
import {
  makeStyles,
} from '@material-ui/core/styles';

const useStyles = makeStyles({
  center: {
    marginTop: "auto",
    marginBottom: "auto",
    textAlign: "center"
  },
});

function BarcodeInput() {
  const classes = useStyles();
  const [itemCode, setItemCode] = useState("");
  const [tmpItemCode, setTmpItemCode] = useState("");

  return (
    <>
      <Grid container style={{ height: 50 }}>
        <Grid item xs={2} >
        </Grid>
        <Grid item xs={8} >
          <form onSubmit={(e) => { setItemCode(tmpItemCode); e.preventDefault(); setTmpItemCode("") }} style={{ height: 50 }} >
            <TextField id="standard-basic" style={{ width: "60%" }} label="Barcode" size="small" onChange={(event) => { setTmpItemCode(event.target.value) }} value={tmpItemCode} />
            {'\u00A0'}
            <Button variant="contained" color="primary" type="submit" style={{ width: "18%", verticalAlign: "bottom" }}>
              Add Product
          </Button>
            {'\u00A0'}
            {itemCode}
          </form>
        </Grid>
        <Grid item xs={2} className={classes.center} style={{ verticalAlign: "bottom" }}>
          <Button variant="contained" color="primary" type="submit" style={{ width: "100%" }}>
            Finish
        </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default BarcodeInput;
