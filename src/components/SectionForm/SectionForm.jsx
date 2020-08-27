import React from "react"
import PropTypes from "prop-types"
import {
  Paper,
  Typography,
  Input,
  InputAdornment,
  IconButton,
  Button,
} from "@material-ui/core"
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline"
import { useStyles } from "./styles"

export default function SectionForm({
  userSectionsField,
  setUserSectionsField,
  value,
  key,
}) {
  const classes = useStyles()
  const addField = (key) => {
    debugger
    const oldField = userSectionsField[key]
    setUserSectionsField({ ...userSectionsField, [key]: oldField.concat("") })
  }

  const removeField = (index, key) => {
    const oldField = userSectionsField[key]
    const newField = oldField.filter((field, i) => i != index)
    setUserSectionsField({ ...userSectionsField, [key]: newField })
  }
  return (
    <Paper>
      <Typography>{key}</Typography>
      {value.map((field, index) => (
        <>
          <Input
            className={classes.arrayInput}
            key={index}
            fullWidth
            defaultValue={field}
            multiline
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
        </>
      ))}
      <Button color="primary" variant="contained" onClick={() => addField(key)}>
        +
      </Button>
    </Paper>
  )
}

SectionForm.propTypes = {
  userSectionsField: PropTypes.objectOf(Object).isRequired,
  setUserSectionsField: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(Object).isRequired,
  key: PropTypes.string,
}
