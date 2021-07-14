import React, { useContext } from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { disabledAddField } from '../../../services/validationAddField';
import { StoreContext } from '../../../store/Store';
import { observable } from 'mobx';

const AddTooltip = observable(({ keyName, value, setOpenEducationForm }) => {
  const store = useContext(StoreContext);

  const infoText = <span style={{ fontSize: '22px' }}>Please fill all input fields</span>;
  const title = disabledAddField(value) ? infoText : '';

  const checkKeyName = () =>
    keyName === 'EDUCATION' ? setOpenEducationForm(true) : store.addField(keyName);

  return (
    <Tooltip element={'span'} title={title}>
      <span>
        <IconButton disabled={disabledAddField(value)} variant="contained" onClick={checkKeyName}>
          <AddIcon />
        </IconButton>
      </span>
    </Tooltip>
  );
});

export default AddTooltip;
