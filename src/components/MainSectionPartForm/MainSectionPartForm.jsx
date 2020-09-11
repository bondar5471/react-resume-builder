import React from "react"
import {
  Card,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core"
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline"
import AddIcon from "@material-ui/icons/Add"
import { useStyles } from "./styles"
import { PropTypes } from "prop-types"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import { debounce } from "../../services/debounce"

export default function MainSectionPartForm({
  sectionsField,
  setSectionFieldMultiValue,
  setSectionFieldSingleValue,
  removeField,
  addField,
}) {
  const classes = useStyles()

  const debounceSetMultiValue = React.useCallback(
    debounce(setSectionFieldMultiValue, 3000),
    []
  )

  const debounceSetSingleValue = React.useCallback(
    debounce(setSectionFieldSingleValue, 300),
    []
  )
  return (
    <>
      {Object.entries(sectionsField).map(([key, value]) =>
        Array.isArray(value) ? (
          <Card className={classes.section} key={key}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {key}
              <IconButton
                variant="contained"
                color="primary"
                onClick={() => addField(key)}
              >
                <AddIcon />
              </IconButton>
            </Typography>
            <Grid container spacing={2} justify="flex-start">
              {value.map((field, index) => (
                <Grid item sm={6} xs={12} key={index}>
                  <OutlinedInput
                    fullWidth
                    value={field}
                    multiline
                    rows={3}
                    variant="outlined"
                    onChange={(e) =>
                      debounceSetMultiValue(e.target.value, key, index)
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          variant="contained"
                          color="secondary"
                          onClick={() => removeField(index, key)}
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </Card>
        ) : (
          <>
            {typeof value === "string" ? (
              <Card className={classes.section} key={key}>
                <TextField
                  className={classes.marginBottom}
                  fullWidth
                  variant="outlined"
                  key={key}
                  id="filled-basic"
                  label={key}
                  defaultValue={value}
                  onChange={(e) => debounceSetSingleValue(e.target.value, key)}
                />
              </Card>
            ) : null}
          </>
        )
      )}
    </>
  )
}

MainSectionPartForm.propTypes = {
  sectionsField: PropTypes.array,
  setSectionFieldSingleValue: PropTypes.func,
  setSectionFieldMultiValue: PropTypes.func,
  removeField: PropTypes.func,
  addField: PropTypes.func,
}
