import React from "react";
import axios from "axios";
import { TextField, Button, Box } from "@material-ui/core";
import { useAlert } from 'react-alert'

function UserInput(props) {
  const alert = useAlert()
  const isValidUserID = userID => {
    return true;
  };

  const userSubmitHandler = async e => {
    e.preventDefault();
    const userInput = props.userID;
    let transaction_response = null;
    let detection_response = null;

    if (isValidUserID(userInput)) {
      try {
        transaction_response = await axios.post(props.transactionApiLink, {
          time: Math.round(Date.now() / 1000),
          branch_id: Number(props.branchID),
          customer_id: Number(props.userID) || null
        });
      }
      catch (error) {
        console.error(error);
        alert.show(error.message + " please try again");
      }
      if (transaction_response) {
        props.setTransactionID(transaction_response.data.transaction_id);
      }

      try {
        // Enter RaspPi detection Link
        detection_response = await axios.get("http://127.0.0.1:8002/detection");
      }
      catch (error) {
        console.error(error);
        alert.show(error.message + " please try again");
      }

      if (detection_response) { props.setUser(detection_response.data); }

      if (detection_response && transaction_response) {
        try {
          axios.post(props.transactionApiLink + 'faceimage/', {
            transaction_id: Number(transaction_response.data.transaction_id),
            face_image_id: Number(detection_response.data.face_image_id)
          });
        }
        catch (error) {
          console.error(error);
          alert.show(error.message + " please try again");
        }
      }
    }
  };

  return (
    <form onSubmit={userSubmitHandler} className={props.className}>
      <Box display="flex">
        <TextField
          variant="filled"
          size="small"
          fullWidth
          label={props.user.name || "userID"}
          onChange={e => {
            props.setUserID(e.target.value);
          }}
          autoFocus
          value={props.userID}
        />
        <Button
          variant="contained"
          color="secondary"
          size="small"
          type="submit"
          disableElevation
        >
          Enter
        </Button>
      </Box>
    </form>
  );
}

export default UserInput;
