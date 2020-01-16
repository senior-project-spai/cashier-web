import React from 'react';
import axios from 'axios'
import {
  TextField,
  Button,
  Grid
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

function BarcodeInput(props) {
  const classes = useStyles();
  const [tmpItemCode, setTmpItemCode] = useState("");

  const barcodeSubmitHandler = (e) => {
    addItemToList(tmpItemCode)
    e.preventDefault();
    setTmpItemCode("")
  }

  const addItemToList = async (itemCode) => {
    if (itemCode.length > 0) {
      const product_detail = await axios.get(props.apiLink + itemCode)
      const itemList = props.itemList

      const existing_item_index = itemList.findIndex((item) => {
        return item.barcode === itemCode
      })

      if (existing_item_index !== -1) {
        itemList[existing_item_index] = {
          ...itemList[existing_item_index],
          quantity: itemList[existing_item_index].quantity + 1
        }
        props.setItemList([...itemList])

        product_detail.data.price = itemList[existing_item_index].price
      }
      else {
        props.setItemList(itemList => [...itemList, {
          ...product_detail.data,
          barcode: itemCode,
          quantity: 1
        }])
      }
      props.setSumPrice(props.sumPrice + product_detail.data.price)
    }
  }

  const finishButtonHandler = () => {
    // TODO: Send all data to user

    // reset everything
    props.setUser({})
    props.setSumPrice(0)
    props.setUserID("")
    props.setItemList([])
  }

  return (
    <>
      <Grid container style={{ height: 50 }}>
        <Grid item xs={2} >
        </Grid>
        <Grid item xs={8} >
          <form
            onSubmit={barcodeSubmitHandler}
            style={{
              height: 50
            }}
          >
            <TextField
              id="standard-basic"
              style={{
                width: "60%"
              }}
              label="Barcode"
              size="small"
              onChange={(event) => { setTmpItemCode(event.target.value) }}
              value={tmpItemCode}
            />
            {'\u00A0'}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{
                width: "18%",
                verticalAlign: "bottom"
              }}
              onClick={barcodeSubmitHandler}
            >
              Add Product
          </Button>
            {'\u00A0'}
          </form>
        </Grid>
        <Grid
          item
          xs={2}
          className={classes.center}
          style={{ verticalAlign: "bottom" }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ width: "100%" }}
            onClick={finishButtonHandler}
          >
            Finish
        </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default BarcodeInput;
