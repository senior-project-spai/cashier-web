import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../logo.svg";

const useStyles = makeStyles(theme => ({
  userImage: {
    height: "100%",
    width: "100%",
    objectFit: "contain",
    backgroundColor: theme.palette.grey[100]
  }
}));

function UserImage(props) {
  const styles = useStyles();

  return (
    <img
      src={props.user.photo_uri || logo}
      className={styles.userImage}
      alt="User"
    />
  );
}

export default UserImage;
