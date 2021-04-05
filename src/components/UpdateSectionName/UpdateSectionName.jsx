import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, IconButton, TextField } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';

import { useStyles } from './styles';

export default function UpdateSectionName({
  changeSectionName,
  open,
  setUpdateSectionNameModal,
  oldSectionName,
}) {
  const [newSectionName, setNewSectionName] = useState('');
  const classes = useStyles();

  const sectionNameValidation = () => {
    //string only contains whitespace (ie. spaces, tabs or line breaks) or empty
    return !newSectionName.replace(/\s/g, '').length || newSectionName === '';
  };
  return (
    <Dialog
      onClose={() => setUpdateSectionNameModal(false)}
      aria-labelledby="update-section-title"
      open={open}
      fullWidth
      maxWidth="md"
    >
      <div className={classes.modalContainer}>
        <DialogTitle id="update-section-title">Set new name</DialogTitle>
        <TextField
          variant="outlined"
          fullWidth
          autoFocus
          defaultValue={oldSectionName}
          required
          onChange={e => setNewSectionName(e.target.value)}
          InputProps={{
            endAdornment: (
              <>
                <IconButton
                  disabled={sectionNameValidation()}
                  onClick={() => changeSectionName(newSectionName)}
                >
                  <DoneIcon />
                </IconButton>
                <IconButton onClick={() => setUpdateSectionNameModal(false)}>
                  <ClearIcon />
                </IconButton>
              </>
            ),
          }}
        />
      </div>
    </Dialog>
  );
}

UpdateSectionName.propTypes = {
  open: PropTypes.bool,
  setUpdateSectionNameModal: PropTypes.func,
  changeSectionName: PropTypes.func,
  oldSectionName: PropTypes.string,
};
