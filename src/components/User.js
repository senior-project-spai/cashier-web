import React from 'react';
import {
  TextField, Button, Grid
} from '@material-ui/core'
import {
  makeStyles,
} from '@material-ui/core/styles';
import { useState } from 'react';
import logo from '../logo.svg';
import axios from 'axios'


const useStyles = makeStyles({
  center: {
    marginTop: "auto",
    marginBottom: "auto",
    textAlign: "center"
  },
});
function User(props) {
  const classes = useStyles();

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://127.0.0.1:8000/detection', { customerId: props.userID })
    console.log(response)
    //TODO: get user image from response
  }
  console.log(props)
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
          onSubmit={formSubmitHandler}
        >
          <TextField
            id="standard-basic"
            label="userID"
            size="small"
            onChange={(event) => { props.setUserID(event.target.value) }}
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
          src={logo}
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
