import React from "react";
import axios from "axios";
import { TextField, Button, Box } from "@material-ui/core";

function UserInput(props) {
  const isValidUserID = userID => {
    return userID;
  };

  const userSubmitHandler = async e => {
    e.preventDefault();
    const userInput = props.userID;
    if (isValidUserID(userInput)) {
      // Enter RaspPi detection Link
      const response = await axios.get("http://127.0.0.1:8000/detection");
      props.setUser(response.data);
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
