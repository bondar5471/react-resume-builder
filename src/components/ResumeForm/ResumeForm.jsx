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

export default function ResumeForm({ setResumeFields }) {
  const classes = useStyles()

  const [userDataField, setUserDataField] = useState(
    JSON.parse(localStorage.getItem("resumeFields")).cv.$person
  )
  const [userSectionsField, setUserSectionsField] = useState(
    JSON.parse(localStorage.getItem("resumeFields")).cv.$sections
  )
  const [sectionProjects, setSectionProjects] = useState(
    JSON.parse(localStorage.getItem("resumeFields")).cv.$sections[
      "SIGNIFICANT PROJECTS"
    ].$projects
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

  const addFieldResponsibility = (proj, indexProj) => {
    const currentProj =
      userSectionsField["SIGNIFICANT PROJECTS"].$projects[indexProj][
        Object.keys(proj)
      ]
    const newResponsibility = currentProj.Responsibilities.concat("")
    // it doesn't work
    setUserSectionsField({
      ...userSectionsField,
      [["SIGNIFICANT PROJECTS"].$projects[indexProj][Object.keys(proj)]
        .Responsibilities]: newResponsibility,
    })
  }

  const setSectionFieldValue = (e, key, index) => {
    const updatedField = userSectionsField[key]
    updatedField[index] = e.target.value
    setUserSectionsField({ ...userSectionsField, [key]: updatedField })
  }

  const setUserFieldValue = (e, key) => {
    setUserDataField({ ...userDataField, [key]: e.target.value })
  }

  const deleteResume = () => {
    localStorage.removeItem("resumeFields")
    setResumeFields(null)
  }
  return (
    <form>
      {/* UserinfoForm */}
      <Button fullWidth color="secondary" onClick={() => deleteResume()}>
        Choose another file
      </Button>
      <Typography>$person</Typography>
      {Object.entries(userDataField).map(([key, value]) => (
        <TextField
          fullWidth
          key={key}
          id="filled-basic"
          label={key}
          defaultValue={value}
          onChange={(e) => setUserFieldValue(e, key)}
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
                  onChange={(e) => setSectionFieldValue(e, key, index)}
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
                    {sectionProjects.map((proj, indexProj) => (
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
                                    // onClick={() => addFieldResponsibility(proj)} //check this method
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
                          onClick={() => addFieldResponsibility(proj, indexProj)}
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
  setResumeFields: PropTypes.func,
}
