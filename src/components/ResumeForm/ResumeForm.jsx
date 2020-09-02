import React, { useState } from "react"
import _ from "lodash"
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
import WriteResumeFile from "../WriteResumeFile"
import AddProjModal from "../AddProjModal"

export default function ResumeForm({ setResumeFields }) {
  const classes = useStyles()

  const [userDataField, setUserDataField] = useState(
    JSON.parse(localStorage.getItem("resumeFields")).cv.$person
  )
  const [sectionsField, setSectionField] = useState(
    JSON.parse(localStorage.getItem("resumeFields")).cv.$sections
  )

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const isObject = (arg) => {
    return !!arg && arg.constructor === Object
  }

  const addField = (key) => {
    const oldField = sectionsField[key]
    setSectionField({ ...sectionsField, [key]: oldField.concat("") })
  }

  const removeField = (index, key) => {
    const oldField = sectionsField[key]
    const newField = oldField.filter((field, i) => i !== index)
    setSectionField({ ...sectionsField, [key]: newField })
  }

  const addFieldResponsibility = (proj, indexProj) => {
    const currentProj =
      sectionsField["SIGNIFICANT PROJECTS"].$projects[indexProj][Object.keys(proj)]
    const newResponsibility = currentProj.Responsibilities.concat("")
    const newProj = _.set(
      sectionsField["SIGNIFICANT PROJECTS"],
      `$projects[${indexProj}].${Object.keys(proj)}.Responsibilities`,
      newResponsibility
    )
    setSectionField({
      ...sectionsField,
      ["SIGNIFICANT PROJECTS"]: newProj,
    })
  }

  const removeFieldResponsibility = (proj, index, indexProj) => {
    const currentProj =
      sectionsField["SIGNIFICANT PROJECTS"].$projects[indexProj][Object.keys(proj)]
    const newResponsibility = currentProj.Responsibilities.filter(
      (field, i) => i != index
    )
    const newProj = _.set(
      sectionsField["SIGNIFICANT PROJECTS"],
      `$projects[${indexProj}].${Object.keys(proj)}.Responsibilities`,
      newResponsibility
    )
    setSectionField({
      ...sectionsField,
      ["SIGNIFICANT PROJECTS"]: newProj,
    })
  }

  const setValueResponsibility = (value, proj, index, indexProj) => {
    const currentProj =
      sectionsField["SIGNIFICANT PROJECTS"].$projects[indexProj][Object.keys(proj)]
    currentProj.Responsibilities[index] = value
    const newProj = _.set(
      sectionsField["SIGNIFICANT PROJECTS"],
      `$projects[${indexProj}].${Object.keys(proj)}.Responsibilities`,
      currentProj.Responsibilities
    )
    setSectionField({
      ...sectionsField,
      ["SIGNIFICANT PROJECTS"]: newProj,
    })
  }

  const createProject = (project) => {
    const updatedProjList = sectionsField["SIGNIFICANT PROJECTS"].$projects.concat(
      project
    )
    setSectionField({
      ...sectionsField,
      ["SIGNIFICANT PROJECTS"]: { $projects: updatedProjList },
    })
  }

  const setSectionFieldMultiValue = (e, key, index) => {
    const updatedField = sectionsField[key]
    updatedField[index] = e.target.value
    setSectionField({ ...sectionsField, [key]: updatedField })
  }

  const setSectionFieldSingleValue = (value, key) => {
    setSectionField({ ...sectionsField, [key]: value })
  }

  const setUserFieldValue = (e, key) => {
    setUserDataField({ ...userDataField, [key]: e.target.value })
  }

  const deleteResume = () => {
    localStorage.removeItem("resumeFields")
    setResumeFields(null)
  }
  console.log(sectionsField)
  return (
    <Paper className={classes.main}>
      <form>
        {/* UserinfoForm */}
        <Button fullWidth color="secondary" onClick={() => deleteResume()}>
          Choose another file
        </Button>
        <Typography variant="h4">$person</Typography>
        {Object.entries(userDataField).map(([key, value]) => (
          <TextField
            className={classes.input}
            fullWidth
            key={key}
            id="filled-basic"
            label={key}
            defaultValue={value}
            onChange={(e) => setUserFieldValue(e, key)}
          />
        ))}
        <Typography variant="h4">$sections</Typography>
        {/* SectionForm */}
        {Object.entries(sectionsField).map(([key, value]) =>
          Array.isArray(value) ? (
            <>
              <Typography>{key}</Typography>
              {value.map((field, index) => (
                <>
                  <Input
                    className={classes.arrayInput}
                    key={index}
                    fullWidth
                    defaultValue={field}
                    multiline
                    onChange={(e) => setSectionFieldMultiValue(e, key, index)}
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
            </>
          ) : (
            <>
              {typeof value === "string" ? (
                <>
                  <TextField
                    className={classes.input}
                    fullWidth
                    key={key}
                    id="filled-basic"
                    label={key}
                    defaultValue={value}
                    onChange={(e) => setSectionFieldSingleValue(e.target.value, key)}
                  />
                </>
              ) : null}
            </>
          )
        )}
        {Object.entries(sectionsField).map(([key, value]) =>
          isObject(value) ? (
            <>
              {/* MultiValueForm */}
              <Typography variant="h4">{key}</Typography>
              {Object.entries(value).map(([label, defaultValue]) => (
                <>
                  {label === "$projects" ? (
                    <>
                      {sectionsField["SIGNIFICANT PROJECTS"].$projects.map(
                        (proj, indexProj) => (
                          <div key={Object.keys(proj)}>
                            <Typography>{Object.keys(proj)}</Typography>
                            <TextField
                              className={classes.input}
                              fullWidth
                              label="name"
                              defaultValue={Object.keys(proj)}
                            />
                            <TextField
                              className={classes.input}
                              fullWidth
                              label="$description"
                              defaultValue={proj[Object.keys(proj)]["$description"]}
                            />
                            <TextField
                              className={classes.input}
                              fullWidth
                              label="Skills"
                              defaultValue={proj[Object.keys(proj)]["Skills"]}
                            />
                            <Typography>Responsibilities</Typography>
                            {proj[Object.keys(proj)]["Responsibilities"].map(
                              (res, index) => (
                                <Input
                                  className={classes.input}
                                  fullWidth
                                  key={index}
                                  defaultValue={res}
                                  onChange={(e) =>
                                    setValueResponsibility(
                                      e.target.value,
                                      proj,
                                      index,
                                      indexProj
                                    )
                                  }
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton
                                        variant="contained"
                                        color="secondary"
                                        onClick={() =>
                                          removeFieldResponsibility(
                                            proj,
                                            index,
                                            indexProj
                                          )
                                        }
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
                          </div>
                        )
                      )}
                    </>
                  ) : (
                    <TextField
                      className={classes.input}
                      fullWidth
                      key={label}
                      id="filled-basic"
                      label={label}
                      defaultValue={defaultValue}
                    />
                  )}
                </>
              ))}
            </>
          ) : null
        )}
        <Button color="secondary" fullWidth onClick={handleOpen}>
          Add proj
        </Button>
      </form>
      <WriteResumeFile userData={userDataField} sectionData={sectionsField} />
      <AddProjModal
        handleClose={handleClose}
        open={open}
        createProject={createProject}
      />
    </Paper>
  )
}

ResumeForm.propTypes = {
  setResumeFields: PropTypes.func,
}
