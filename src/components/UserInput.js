import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, CircularProgress } from "@material-ui/core";
import { useAlert } from "react-alert";

import SquaredButton from "./SquaredButton";

function UserInput(props) {
  const alert = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const isValidUserID = userID => {
    return true;
  };

  const userSubmitHandler = async e => {
    setIsLoading(true);
    e.preventDefault();
    const userInput = props.userID;
    let detection_response = null;

    if (isValidUserID(userInput)) {
      try {
        // Enter RaspPi detection Link
        detection_response = await axios.get("http://127.0.0.1:8002/detection");
      } catch (error) {
        console.error(error);
        alert.show(error.message + " please try again");
      }

      if (detection_response) {
        props.setUser(detection_response.data);
      }
    }
    setIsLoading(false);
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
        <SquaredButton
          variant="contained"
          color="secondary"
          size="small"
          type="submit"
          disableElevation
        >
          {!isLoading ? (
            "Enter"
          ) : (
            <CircularProgress size={32} color="inherit" />
          )}
        </SquaredButton>
      </Box>
    </form>
  );
}

export default UserInput;
