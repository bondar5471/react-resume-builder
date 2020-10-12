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

export default function AddEducationInfo({
  openEducationForm,
  handleCloseCreate,
  addFieldToEducation,
  institution,
  degree,
  setInstitution,
  setDegree,
}) {
  const classes = useStyles();
  return (
    <Dialog
      open={openEducationForm}
      onClose={handleCloseCreate}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Add education information'}</DialogTitle>
      <form
        onSubmit={e => {
          e.preventDefault();
          addFieldToEducation([institution, degree]);
          handleCloseCreate();
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
            onBlur={e => setInstitution(e.target.value)}
          />
          <TextField
            required
            className={classes.marginBottom}
            fullWidth
            variant="outlined"
            id="filled-basic"
            label="Degree"
            onBlur={e => setDegree(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreate}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

AddEducationInfo.propTypes = {
  institution: PropTypes.string,
  degree: PropTypes.string,
  setDegree: PropTypes.func,
  setInstitution: PropTypes.func,
  openEducationForm: PropTypes.bool,
  handleCloseCreate: PropTypes.func,
  addFieldToEducation: PropTypes.func,
};
