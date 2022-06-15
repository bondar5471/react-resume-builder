import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ResetFileAlert({ cancelEditFile, closeCancelEditFile, deleteResume }) {
  return (
    <Dialog
      open={cancelEditFile}
      onClose={closeCancelEditFile}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you want leave this page ?
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
          startIcon={<DeleteIcon />}
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
