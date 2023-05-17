import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button, Typography } from '@material-ui/core';
import { useStyles } from './styles';

export default function ResetFileAlert({ cancelEditFile, closeCancelEditFile, deleteResume }) {
  const classes = useStyles();

  return (
    <Dialog
      open={cancelEditFile}
      onClose={closeCancelEditFile}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={classes}
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description" className={classes.dialogContent}>
          Your changes won't be saved. Do you want to leave this page?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      <Button
          color="primary"
          variant="contained"
          onClick={closeCancelEditFile}
          autoFocus
        >
          Disagree
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => deleteResume()}
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ResetFileAlert.propTypes = {
  cancelEditFile: PropTypes.bool,
  closeCancelEditFile: PropTypes.func,
  deleteResume: PropTypes.func,
};
