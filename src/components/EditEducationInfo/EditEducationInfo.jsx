import React, { useState, useEffect } from 'react';
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
}) {
  useEffect(() => {
    setInitialState();
  }, [editedField]);

  const [university, setUniversity] = useState('');
  const [degree, setDegree] = useState('');
  const classes = useStyles();

  const setInitialState = () => {
    setUniversity(editedField[0]);
    setDegree(editedField[1]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    handleUpdate(university, degree);
  };

  return (
    <Dialog
      open={openEditForm}
      onClose={handleCloseEdit}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Edit education info</DialogTitle>
      <form
        onSubmit={e => {
          handleSubmit(e);
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
              onChange={e => setUniversity(e.target.value)}
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
              onChange={e => setDegree(e.target.value)}
            />
          </Tooltip>
        </DialogContent>
        <DialogActions>
          <Button type="submit" variant="contained">
            Edit
          </Button>
          <Button onClick={handleCloseEdit} variant="contained" color="secondary">
            Cancel
          </Button>
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
