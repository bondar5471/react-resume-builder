import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { StoreContext } from '../../../store/Store';
import { useStyles } from './styles';
import { observable } from 'mobx';

const DeleteButton = observable(({ sectionName }) => {
  const classes = useStyles();
  const store = React.useContext(StoreContext);

  const clickHandler = () => store.removeSection(sectionName);

  return (
    <IconButton
      color="secondary"
      title={`Remove section ${sectionName.sectionName}`}
      className={classes.removeSectionButton}
      onClick={clickHandler}
    >
      <DeleteSweepIcon color="secondary" />
    </IconButton>
  );
});

export default DeleteButton;

DeleteButton.propTypes = {
  sectionName: PropTypes.string,
};
