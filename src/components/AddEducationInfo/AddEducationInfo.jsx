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
      <DialogTitle id="alert-dialog-title">Add education information</DialogTitle>
      <form
        onSubmit={e => {
          e.preventDefault();
          addFieldToEducation([institution, degree]);
          handleCloseCreate();
        }}
      >
        <DialogContent>
          <Tooltip title="ex.: KARAZIN KHARKIV NATIONAL UNIVERSITY">
            <TextField
              required
              className={classes.marginBottom}
              fullWidth
              variant="outlined"
              label="Educational institution"
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
              onBlur={e => setDegree(e.target.value)}
            />
          </Tooltip>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="default" type="submit">
            Add
          </Button>
          <Button variant="contained" color="secondary" onClick={handleCloseCreate}>
            Cancel
          </Button>
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
