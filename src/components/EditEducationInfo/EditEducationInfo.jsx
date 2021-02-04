import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { useStyles } from './styles';

export default function EditEducationInfo({
  openEditForm,
  handleCloseEdit,
  editedField,
  handleUpdate,
  setInstitution,
  setDegree,
}) {
  const classes = useStyles();
  return (
    <Dialog
      open={openEditForm}
      onClose={handleCloseEdit}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Add education information'}</DialogTitle>
      <form
        onSubmit={e => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <DialogContent>
          <TextField
            required
            className={classes.marginBottom}
            fullWidth
            variant="outlined"
            id="filled-basic"
            label="Educational institution"
            defaultValue={editedField[0]}
            onBlur={e => setInstitution(e.target.value)}
          />
          <TextField
            required
            className={classes.marginBottom}
            fullWidth
            variant="outlined"
            id="filled-basic"
            label="Degree"
            defaultValue={editedField[1]}
            onBlur={e => setDegree(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button type="submit">Edit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

EditEducationInfo.propTypes = {
  editedField: PropTypes.array,
  setDegree: PropTypes.func,
  setInstitution: PropTypes.func,
  handleUpdate: PropTypes.func,
  openEditForm: PropTypes.bool,
  handleCloseEdit: PropTypes.func,
};
