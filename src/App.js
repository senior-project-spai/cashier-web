import React from 'react';
import { useState } from 'react';
import './App.scss';
import ItemTable from './components/ItemTable'
import BarcodeInput from './components/BarcodeInput'
import User from './components/User'

function App() {
  const [itemList, setItemList] = useState([]);
  const [sumPrice, setSumPrice] = useState(0);
  const [user, setUser] = useState({})
  const [userID, setUserID] = useState("");

  const apiLink = "https://mock-api-spai.apps.spai.ml/_api/"

  return (
    <div className="App">
      <User
        sumPrice={sumPrice}
        apiLink={apiLink + "user/"}
        setUser={setUser}
        user={user}
        setUserID={setUserID}
        userID={userID}
      />
      <BarcodeInput
        itemList={itemList}
        setItemList={setItemList}
        setSumPrice={setSumPrice}
        sumPrice={sumPrice}
        apiLink={apiLink + "product/"}
        setUser={setUser}
        setUserID={setUserID}
      />
      <ItemTable
        itemList={itemList}
        setItemList={setItemList}
      />
    </div>
  );
}

export default App;
