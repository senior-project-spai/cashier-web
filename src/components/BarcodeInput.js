import React from 'react';
import {
  TextField, Button
} from '@material-ui/core'
import { useState } from 'react';

function BarcodeInput() {
  const [itemCode, setItemCode] = useState(-1);
  const [tmpItemCode, setTmpItemCode] = useState(-1);

  return (
    <form onSubmit={(e) => { setItemCode(tmpItemCode); e.preventDefault() }} style={{ height: 50 }}>
      <TextField id="standard-basic" label="Barcode" size="small" onChange={(event) => { setTmpItemCode(event.target.value) }} />
      {'\u00A0'}
      <Button variant="contained" color="primary" onClick={() => { setItemCode(tmpItemCode) }}>
        Send
      </Button>
      {'\u00A0'}
      {itemCode}
    </form>
  );
}

export default BarcodeInput;
