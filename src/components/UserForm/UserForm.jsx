import React from "react"
import { Grid, TextField, Typography } from "@material-ui/core"
import PropTypes from "prop-types"

import { debounce } from "../../services/debounce"

export default function UserForm({ setUserFieldValue, userDataField }) {
  const debounceUserFieldValue = React.useCallback(
    debounce(setUserFieldValue, 300),
    []
  )
  return (
    <>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        User information
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(userDataField).map(([key, value]) => (
          <Grid key={key} item sm={key === "$photo" ? 12 : 6} xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              key={key}
              id="filled-basic"
              label={key.substring(1)}
              defaultValue={value}
              onChange={(e) => debounceUserFieldValue(e.target.value, key)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

UserForm.propTypes = {
  userDataField: PropTypes.objectOf(Object).isRequired,
  setUserFieldValue: PropTypes.func.isRequired,
}
