import React, { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { disabledAddField } from '../../services/validationAddField';

const AddTooltip = ({keyName, value, setOpenEducationForm}) => {
  const store = useContext(StoreContext);
  return (
    <Tooltip
      element={'span'}
      title={
        disabledAddField(value) ? (
          <span style={{ fontSize: '22px' }}>Please fill all input fields</span>
        ) : (
          ''
        )
      }
    >
      <span>
        <IconButton
          disabled={disabledAddField(value)}
          variant="contained"
          onClick={() =>
            keyName === 'EDUCATION' ? setOpenEducationForm(true) : store.addField(keyName)
          }
        >
          <AddIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default AddTooltip;
