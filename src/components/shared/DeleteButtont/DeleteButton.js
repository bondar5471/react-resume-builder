import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { StoreContext } from '../../../store/Store';
import { useStyles } from './styles';

const DeleteButton = ({ sectionName }) => {
  const classes = useStyles();
  const store = React.useContext(StoreContext);

  return (
    <IconButton
      color="secondary"
      title={`Remove section ${sectionName}`}
      className={classes.removeSectionButton}
      onClick={() => store.removeSection(sectionName)}
    >
      <DeleteSweepIcon color="secondary" />
    </IconButton>
  );
};

export default DeleteButton;

DeleteButton.propTypes = {
  sectionName: PropTypes.string,
};
