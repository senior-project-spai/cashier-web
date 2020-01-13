import React from 'react';
import {
  TextField, Button, Grid
} from '@material-ui/core'
import {
  makeStyles,
} from '@material-ui/core/styles';
import { useState } from 'react';
import logo from '../logo.svg';
const useStyles = makeStyles({
  center: {
    marginTop: "auto",
    marginBottom: "auto",
    textAlign: "center"
  },
});
function User() {
  const classes = useStyles();

  const [userID, setUserID] = useState("");
  const [tmpUserID, setTmpUserID] = useState("");
  return (
    <Grid container style={{ height: 150 }}>
      <Grid item xs={4} className={classes.center}>
        <form onSubmit={(e) => { setUserID(tmpUserID); e.preventDefault(); setTmpUserID("") }}>
          <TextField id="standard-basic" label="UserID" size="small" onChange={(event) => { setTmpUserID(event.target.value) }} autoFocus value={tmpUserID}/>
          {'\u00A0'}
          <Button variant="contained" color="primary" style={{ height: "100%" }} type="submit">
            Send
            </Button>
          {'\u00A0'}
          {userID}
        </form>
      </Grid>
      <Grid item xs={4}>
        <img style={{ height: 150, width: "auto" }} src={logo} alt="User" />
      </Grid>
      <Grid item xs={4} className={classes.center}>
        <h1 style={{ fontSize: 55 }}>12345678.00</h1>
      </Grid>
    </Grid>
  );
}

export default User;
