import React from "react";
import axios from "axios";
import { TextField, Button, Box } from "@material-ui/core";
import { useState } from "react";
import { useAlert } from 'react-alert';

import SquaredButton from "./SquaredButton";

function BarcodeInput(props) {
  const [tmpItemCode, setTmpItemCode] = useState("");
  const alert = useAlert();
  const barcodeSubmitHandler = e => {
    addItemToList(tmpItemCode);
    e.preventDefault();
    setTmpItemCode("");
  };

  const addItemToList = async itemCode => {
    if (itemCode.length > 0) {
      let product_detail = null
      try {
        product_detail = await axios.get(props.apiLink + itemCode);
      }
      catch (error) {
        console.error(error);
        alert.show("product not found");
        return
      }
      const itemList = props.itemList;

      const existing_item_index = itemList.findIndex(item => {
        return item.barcode === itemCode;
      });

      if (existing_item_index !== -1) {
        itemList[existing_item_index] = {
          ...itemList[existing_item_index],
          quantity: itemList[existing_item_index].quantity + 1
        };
        props.setItemList([...itemList]);

        product_detail.data.price = itemList[existing_item_index].price;
      } else {
        props.setItemList(itemList => [
          ...itemList,
          {
            ...product_detail.data,
            barcode: itemCode,
            quantity: 1
          }
        ]);
      }
      props.setSumPrice(props.sumPrice + product_detail.data.price);
    }
  };

  return (
    <form onSubmit={barcodeSubmitHandler} className={props.className}>
      <Box display="flex">
        <TextField
          id="standard-basic"
          fullWidth
          label="Barcode"
          size="small"
          onChange={event => {
            setTmpItemCode(event.target.value);
          }}
          value={tmpItemCode}
          variant="filled"
        />

        <SquaredButton
          variant="contained"
          color="secondary"
          size="small"
          type="submit"
          disableElevation
          onClick={barcodeSubmitHandler}
        >
          Add
        </SquaredButton>
      </Box>
    </form>
  );
}

export default BarcodeInput;
