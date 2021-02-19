import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  TextField,
  Button,
  Tooltip,
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
          <Tooltip title="ex.: KARAZIN KHARKIV NATIONAL UNIVERSITY">
            <TextField
              required
              className={classes.marginBottom}
              fullWidth
              variant="outlined"
              label="ex.: Educational institution"
              defaultValue={editedField[0]}
              onBlur={e => setInstitution(e.target.value)}
            />
          </Tooltip>
          <Tooltip title="ex.: Master's degree in System engineering">
            <TextField
              required
              className={classes.marginBottom}
              fullWidth
              variant="outlined"
              label="Degree"
              defaultValue={editedField[1]}
              onBlur={e => setDegree(e.target.value)}
            />
          </Tooltip>
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
