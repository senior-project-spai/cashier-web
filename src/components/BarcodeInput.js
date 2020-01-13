import React from 'react';
import {
  TextField, Button
} from '@material-ui/core'
import { useState } from 'react';

function BarcodeInput() {
  const [itemCode, setItemCode] = useState("");
  const [tmpItemCode, setTmpItemCode] = useState("");

  return (
    <form onSubmit={(e) => { setItemCode(tmpItemCode); e.preventDefault();setTmpItemCode("") }} style={{ height: 50 }}>
      <TextField id="standard-basic" label="Barcode" size="small" onChange={(event) => { setTmpItemCode(event.target.value) }} value={tmpItemCode}/>
      {'\u00A0'}
      <Button variant="contained" color="primary" type="submit">
        Send
      </Button>
      {'\u00A0'}
      {itemCode}
    </form>
  );
}

export default BarcodeInput;