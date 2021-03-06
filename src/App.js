import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline, Typography, Box, TextField } from "@material-ui/core";
import { useAlert } from "react-alert";
import ItemTable from "./components/ItemTable";
import BarcodeInput from "./components/BarcodeInput";
import UserImage from "./components/UserImage";
import UserInput from "./components/UserInput";
import logo from "./logo.svg";
import axios from "axios";

import SquaredButton from "./components/SquaredButton";

const PI_CAMERA_LINK = process.env.REACT_APP_PI_CAMERA_LINK || "http://10.2.13.141:8080/detection";
const CASHIER_API_LINK = process.env.REACT_APP_CASHIER_API_LINK || "https://cashier-api-spai.apps.spai.ml/_api/";


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

function Home() {
  const [itemList, setItemList] = useState([]);
  const [sumPrice, setSumPrice] = useState(0);
  const [user, setUser] = useState({});
  const [userID, setUserID] = useState("");
  const [branchID, setBranchID] = useState(0);
  const [transactionID, setTransactionID] = useState(-1);
  const [showPiCameraLinkField, setShowPiCameraLinkField] = useState(false);
  const [piCameraLink, setPiCameraLink] = useState(PI_CAMERA_LINK);
  const apiLink = CASHIER_API_LINK;
  const alert = useAlert();
  const finishButtonHandler = async () => {
    let transaction_response = null;
    try {
      transaction_response = await axios.post(apiLink + "transaction/", {
        time: Math.round(Date.now() / 1000),
        branch_id: Number(branchID),
        customer_id: Number(userID) || null
      });
    } catch (error) {
      console.error(error);
      alert.show(error.message + " transaction");
    }

    if (transaction_response) {
      setTransactionID(transaction_response.data.transaction_id);

      try {
        axios.post(apiLink + "transaction/faceimage/", {
          transaction_id: Number(transaction_response.data.transaction_id),
          face_image_id: Number(user.face_image_id)
        });
      } catch (error) {
        console.error(error);
        alert.show(error.message + " please try again");
      }

      try {
        await axios.post(apiLink + "transaction/product/", {
          transaction_id: Number(transaction_response.data.transaction_id),
          product_list: itemList
        });
      } catch (error) {
        console.error(error);
        alert.show(error.message + " please try again");
      }
    }

    // reset everything
    setUser({});
    setSumPrice(0);
    setUserID("");
    setItemList([]);
  };

  const triggerPiCameraLinkInputField = () => {
    setShowPiCameraLinkField(!showPiCameraLinkField)
  }

  const piCameraLinkChangeHandler = (e) => {
    setPiCameraLink(e.target.value)
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
            transactionApiLink={apiLink + "transaction/"}
            setUser={setUser}
            user={user}
            setUserID={setUserID}
            userID={userID}
            branchID={branchID}
            setTransactionID={setTransactionID}
            transactionID={transactionID}
            piCameraLink={piCameraLink}
          />

          <img src={logo} className={styles.logo} alt="logo" onClick={triggerPiCameraLinkInputField} />

          {showPiCameraLinkField ? <TextField value={piCameraLink} onChange={piCameraLinkChangeHandler} /> : <></>}

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
          <SquaredButton
            variant="contained"
            color="primary"
            type="submit"
            onClick={finishButtonHandler}
            className={styles.finish}
          >
            Finish
          </SquaredButton>
          <Box className={styles.total} m="auto">
            <Typography variant="h3">{sumPrice.toFixed(2)}</Typography>
          </Box>
        </div>
        <ItemTable itemList={itemList} setItemList={setItemList} />
      </div>
    </>
  );
}

export default Home;
