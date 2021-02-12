import React from 'react';
import { Grid, TextField, Typography, Tooltip } from '@material-ui/core';
import PropTypes from 'prop-types';
import { handleInput } from '../../services/HandleInput';

export default function UserForm({ setUserFieldValue, userDataField, setGlobalError }) {
  return (
    <>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        User information
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(userDataField).map(([key, value]) => (
          <Grid key={value} item sm={key === '$photo' ? 12 : 6} xs={12}>
            <Tooltip title={key === '$photo' ? 'Specify the path to the file or upload file.' : ''}>
              <TextField
                error={!value}
                fullWidth
                key={value}
                label={key.substring(1)}
                defaultValue={value}
                onBlur={e =>
                  handleInput(
                    setGlobalError,
                    e.target.value,
                    setUserFieldValue(e.target.value, key),
                  )
                }
                helperText={!value ? 'This field is required' : null}
              />
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

UserForm.propTypes = {
  userDataField: PropTypes.objectOf(Object).isRequired,
  setUserFieldValue: PropTypes.func.isRequired,
  setGlobalError: PropTypes.func,
};
