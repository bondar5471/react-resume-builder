import React from 'react';
import { IconButton, } from '@material-ui/core';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import { StoreContext } from '../../../store/Store';

const DeleteButton = props => {
  const store = React.useContext(StoreContext);

  return (
    <IconButton
      color="secondary"
      title={`Remove section ${props.sectionName}`}
    //   className={classes.removeSectionButton}
      onClick={() => store.removeSection(props.sectionName)}
    >
      <DeleteSweepIcon color="secondary" />
    </IconButton>
  );
};

export default DeleteButton;
