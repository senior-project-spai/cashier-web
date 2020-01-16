import React from 'react';
import { useState } from 'react';
import './App.scss';
import ItemTable from './components/ItemTable'
import BarcodeInput from './components/BarcodeInput'
import User from './components/User'
import axios from 'axios'

function App() {
  const [userID, setUserID] = useState("");
  const [itemList, setItemList] = useState([]);

  const addItemToList = async (itemCode) => {
    if (itemCode.length > 0) {
      const product_detail = await axios.get('http://mock-api-spai.apps.spai.ml/_api/product/' + itemCode)

      const existing_item_index = itemList.findIndex((item) => {
        return item.barcode === itemCode
      })

      if (existing_item_index != -1) {
        itemList[existing_item_index] = {
          ...itemList[existing_item_index],
          quantity: itemList[existing_item_index].quantity + 1
        }
        setItemList([...itemList])
      }
      else {
        setItemList(itemList => [...itemList, {
          ...product_detail.data,
          barcode: itemCode,
          quantity: 1
        }])
      }
    }
  }

  return (
    <div className="App">
      <User
        setUserID={setUserID}
        userID={userID}
      />
      <BarcodeInput
        addItemToList={addItemToList}
      />
      <ItemTable
        itemList={itemList}
        setItemList={setItemList}
        userID={userID}
      />
    </div>
  );
}

export default App;
