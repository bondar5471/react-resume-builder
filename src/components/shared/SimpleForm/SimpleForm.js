import React from 'react';
import { Grid, TextField, Tooltip } from '@material-ui/core';
import { handleInput } from '../../../services/HandleInput';
import DeleteButton from '../DeleteButtont/DeleteButton';
import { StoreContext } from '../../../store/Store';

const SimpleForm = props => {
  const store = React.useContext(StoreContext);

  return (
    <Tooltip title={props.keyName === 'ROLE' ? 'Ex.: Full-stack Ruby Developer' : ''}>
      <Grid container>
        <Grid item xs={11}>
          <TextField
            // className={classes.marginBottom}
            fullWidth
            variant="outlined"
            label={props.keyName}
            defaultValue={props.value}
            onChange={e =>
              handleInput(
                ()=>{}, //setGlobalError
                e.target.value,
                store.setSectionStringField(props.keyName, e.target.value),
              )
            }
          />
        </Grid>
        <Grid item xs={1}>
          <DeleteButton sectionName={props.keyName}></DeleteButton>
        </Grid>
      </Grid>
    </Tooltip>
  );
};

export default SimpleForm;
