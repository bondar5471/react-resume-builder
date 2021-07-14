import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import { observable } from 'mobx';
import EditIcon from '@material-ui/icons/Edit';

const EditButton = observable(({ sectionName, editSection }) => {
  return (
    <IconButton variant="contained" onClick={() => editSection(sectionName)}>
      <EditIcon />
    </IconButton>
  );
});

export default EditButton;

EditButton.propTypes = {
  sectionName: PropTypes.string,
};
