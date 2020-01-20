import React from 'react';
import axios from 'axios'
import {
  TextField,
  Button,
  Grid
} from '@material-ui/core'
import {
  makeStyles,
} from '@material-ui/core/styles';
import logo from '../logo.svg';

const useStyles = makeStyles({
  center: {
    marginTop: "auto",
    marginBottom: "auto",
    textAlign: "center"
  },
});
function User(props) {
  const classes = useStyles();

  const isValidUserID = (userID) => {
    return userID
  }

  const userSubmitHandler = async (e) => {
    e.preventDefault();
    const userInput = props.userID
    if (isValidUserID(userInput)) {
      // Enter RaspPi detection Link
      const response = await axios.get('http://127.0.0.1:8000/detection')
      props.setUser(response.data)
    }
  }

  return (
    <Grid
      container
      style={{
        height: 150
      }}
    >
      <Grid
        item
        xs={4}
        className={classes.center}
      >
        <form
          onSubmit={userSubmitHandler}
        >
          <TextField
            id="standard-basic"
            label={props.user.name || "userID"}
            size="small"
            onChange={e => { props.setUserID(e.target.value) }}
            autoFocus
            value={props.userID}
          />
          {'\u00A0'}
          <Button
            variant="contained"
            color="primary"
            style={{
              height: "100%"
            }}
            type="submit"
          >
            Enter
            </Button>
          {'\u00A0'}
        </form>
      </Grid>
      <Grid item xs={4}>
        <img
          style={{
            height: 150,
            width: "auto"
          }}
          src={props.user.photo_uri || logo}
          alt="User"
        />

      </Grid>
      <Grid item xs={4} className={classes.center}>
        <h1
          style={{
            fontSize: 55
          }}
        >
          {props.sumPrice.toFixed(2)}
        </h1>
      </Grid>
    </Grid>
  );
}

export default User;
