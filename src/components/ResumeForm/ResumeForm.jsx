import React, { useState } from "react"
import { PropTypes } from "prop-types"
import {
  TextField,
  Typography,
  Paper,
  Button,
  InputAdornment,
  Input,
  IconButton,
} from "@material-ui/core"
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline"
import ControlPointIcon from "@material-ui/icons/ControlPoint"

import { useStyles } from "./styles"

export default function ResumeForm({ formData }) {
  debugger
  const classes = useStyles()
  const [userDataField, setUserDataField] = useState(formData.cv.$person)
  const [userSectionsField, setUserSectionsField] = useState(formData.cv.$sections)
  const [sectionProjects, setSectionProjects] = useState(
    formData.cv.$sections["SIGNIFICANT PROJECTS"].$projects
  )
  const isObject = (arg) => {
    return !!arg && arg.constructor === Object
  }

  const addField = (key) => {
    const oldField = userSectionsField[key]
    setUserSectionsField({ ...userSectionsField, [key]: oldField.concat("") })
  }

  const removeField = (index, key) => {
    const oldField = userSectionsField[key]
    const newField = oldField.filter((field, i) => i != index)
    setUserSectionsField({ ...userSectionsField, [key]: newField })
  }
  return (
    <form>
      {/* UserinfoForm */}
      <Typography>$person</Typography>
      {Object.entries(userDataField).map(([key, value]) => (
        <TextField
          fullWidth
          key={key}
          id="filled-basic"
          label={key}
          defaultValue={value}
        />
      ))}
      <Typography>$sections</Typography>
      {/* SectionForm */}
      {Object.entries(userSectionsField).map(([key, value]) =>
        Array.isArray(value) ? (
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
            <IconButton color="primary" onClick={() => addField(key)}>
              <ControlPointIcon />
            </IconButton>
          </Paper>
        ) : null
      )}
      {Object.entries(userSectionsField).map(([key, value]) =>
        isObject(value) ? (
          <Paper>
            {/* MultiValueForm */}
            <Typography>{key}</Typography>
            {Object.entries(value).map(([label, defaultValue]) => (
              <>
                {label === "$projects" ? (
                  <>
                    {sectionProjects.map((proj) => (
                      <Paper key={Object.keys(proj)}>
                        <Typography>{Object.keys(proj)}</Typography>
                        <TextField
                          fullWidth
                          label="$description"
                          defaultValue={proj[Object.keys(proj)]["$description"]}
                        />
                        <TextField
                          fullWidth
                          label="Skills"
                          defaultValue={proj[Object.keys(proj)]["Skills"]}
                        />
                        <Typography>Responsibilities</Typography>
                        {proj[Object.keys(proj)]["Responsibilities"].map(
                          (res, index) => (
                            <Input
                              fullWidth
                              key={index}
                              defaultValue={res}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    variant="contained"
                                    color="secondary"
                                    // onClick={() => addFieldResponsibility(index, key)} //check this method
                                  >
                                    <RemoveCircleOutlineIcon />
                                  </IconButton>
                                </InputAdornment>
                              }
                            />
                          )
                        )}
                        <Button
                          color="primary"
                          variant="contained"
                          // onClick={() => addFieldResponsibility(key)} //check this method
                        >
                          +
                        </Button>
                        <TextField
                          fullWidth
                          label="Team"
                          defaultValue={proj[Object.keys(proj)]["Team"]}
                        />
                      </Paper>
                    ))}
                  </>
                ) : (
                  <TextField
                    fullWidth
                    key={label}
                    id="filled-basic"
                    label={label}
                    defaultValue={defaultValue}
                  />
                )}
              </>
            ))}
          </Paper>
        ) : null
      )}
    </form>
  )
}

ResumeForm.propTypes = {
  formData: PropTypes.objectOf(Object).isRequired,
}
