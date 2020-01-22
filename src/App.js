import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CssBaseline, Typography, Box } from "@material-ui/core";
import ItemTable from "./components/ItemTable";
import BarcodeInput from "./components/BarcodeInput";
import UserImage from "./components/UserImage";
import UserInput from "./components/UserInput";
import logo from "./logo.svg";
import axios from 'axios'

const useStyles = makeStyles({
  headerContainer: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 3fr minmax(0, 1fr)",
    gridTemplateRows: "200px min-content",
    gridTemplateAreas: `"user-image logo    total "
                        "user       barcode finish";`
  },
  userImage: {
    gridArea: "user-image"
  },
  user: {
    gridArea: "user"
  },
  logo: {
    gridArea: "logo",
    width: "100%",
    height: "100%",
    objectFit: "contain",
    backgroundColor: ""
  },
  barcodeInput: {
    gridArea: "barcode"
  },
  finish: {
    gridArea: "finish"
  },
  total: {
    gridArea: "total"
  }
});

function App() {
  const [itemList, setItemList] = useState([]);
  const [sumPrice, setSumPrice] = useState(0);
  const [user, setUser] = useState({});
  const [userID, setUserID] = useState("");
  const [branchID, setBranchID] = useState(0);
  const [transactionID,setTransactionID] = useState(-1)

  const apiLink = "https://cashier-api-spai.apps.spai.ml/_api/";

  const finishButtonHandler = () => {
    // TODO: Send all data to db
    axios.post(apiLink + "product/", {
      transaction_id: transactionID,
      product_list: itemList
    })
    // reset everything
    setUser({})
    setSumPrice(0)
    setUserID("")
    setItemList([])
  }

  const styles = useStyles();

  return (
    <>
      <CssBaseline />
      <div className="App">
        <div className={styles.headerContainer}>
          <UserImage className={styles.userImage} user={user} />
          <UserInput
            className={styles.user}
            apiLink={apiLink + "user/"}
            setUser={setUser}
            user={user}
            setUserID={setUserID}
            userID={userID}
          />
          <img src={logo} className={styles.logo} alt="logo" />
          <BarcodeInput
            className={styles.barcodeInput}
            itemList={itemList}
            setItemList={setItemList}
            setSumPrice={setSumPrice}
            sumPrice={sumPrice}
            apiLink={apiLink + "product/"}
            setUser={setUser}
            setUserID={setUserID}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={finishButtonHandler}
            className={styles.finish}
          >
            Finish
          </Button>
          <Box className={styles.total} m="auto">
            <Typography variant="h3">{sumPrice.toFixed(2)}</Typography>
          </Box>
        </div>
        <ItemTable itemList={itemList} setItemList={setItemList} />
      </div>
    </>
  );
}

export default App;
