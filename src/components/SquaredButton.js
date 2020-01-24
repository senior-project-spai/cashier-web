import React from 'react'
import { Button, withStyles } from '@material-ui/core'

const SquaredButton = withStyles(theme => ({
    root: {
      borderRadius: 0
    }
  }))(Button);

export default SquaredButton