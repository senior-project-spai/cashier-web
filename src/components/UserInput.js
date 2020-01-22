import React from "react";
import axios from "axios";
import { TextField, Button, Box } from "@material-ui/core";

function UserInput(props) {
  const isValidUserID = userID => {
    return true;
  };

  const userSubmitHandler = async e => {
    e.preventDefault();
    const userInput = props.userID;
    if (isValidUserID(userInput)) {
      const transaction_response = await axios.post(props.transactionApiLink, {
        time: Math.round(Date.now() / 1000),
        branch_id: props.branchID,
        customer_id: Number(props.userID) || null
      })
      props.setTransactionID(transaction_response.data.transaction_id)
      // Enter RaspPi detection Link
      const detection_response = await axios.get("http://127.0.0.1:8002/detection");
      props.setUser(detection_response.data);


      axios.post(props.transactionApiLink + 'faceimage/', {
        transaction_id: Number(transaction_response.data.transaction_id),
        face_image_id: Number(detection_response.data.face_image_id)
      })

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
