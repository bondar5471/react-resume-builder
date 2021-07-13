import React from 'react';
import { observer } from 'mobx-react-lite';
import { Grid, TextField, Tooltip, Card } from '@material-ui/core';
import { handleInput } from '../../../services/HandleInput';
import DeleteButton from '../DeleteButtont/DeleteButton';
import { StoreContext } from '../../../store/Store';
import { useStyles } from './styles';

const SimpleForm = observer(({ keyName, value, setGlobalError }) => {
  const store = React.useContext(StoreContext);
  const classes = useStyles();
  return (
    <Card className={classes.section}>
      <Tooltip title={keyName === 'ROLE' ? 'Ex.: Full-stack Ruby Developer' : ''}>
        <Grid container>
          <Grid item xs={11}>
            <TextField
              className={classes.marginBottom}
              fullWidth
              variant="outlined"
              label={keyName}
              defaultValue={value}
              onChange={e =>
                handleInput(
                  setGlobalError,
                  e.target.value,
                  store.setSectionStringField(keyName, e.target.value),
                )
              }
            />
          </Grid>
          <Grid item xs={1}>
            <DeleteButton sectionName={keyName}></DeleteButton>
          </Grid>
        </Grid>
      </Tooltip>
    </Card>
  );
});

export default SimpleForm;
