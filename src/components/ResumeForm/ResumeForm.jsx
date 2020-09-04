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
import TechnologyStackForm from "../TechnologyStackForm"
import SectionForm from "../SectionForm"

export default function ResumeForm({ setResumeFields }) {
  const classes = useStyles()

  const [userDataField, setUserDataField] = useState(
    JSON.parse(localStorage.getItem("resumeFields")).cv.$person
  )
  const [sectionsField, setSectionField] = useState(
    JSON.parse(localStorage.getItem("resumeFields")).cv.$sections
  )

  const [open, setOpen] = useState(false)

  const [openTsForm, setOpenTsForm] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpenTsForm = () => {
    setOpenTsForm(true)
  }

  const handleCloseTsForm = () => {
    setOpenTsForm(false)
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

  const setSingleObjectField = (value, sectionKey, key) => {
    const updatetSection = _.set(sectionsField[sectionKey], `${key}`, value)
    setSectionField({
      ...sectionsField,
      [sectionKey]: updatetSection,
    })
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

  const setSingleFieldProject = (value, proj, fieldKey, indexProj) => {
    const updatedProject = _.set(
      sectionsField["SIGNIFICANT PROJECTS"],
      `$projects[${indexProj}].${Object.keys(proj)}.${fieldKey}`,
      value
    )
    setSectionField({
      ...sectionsField,
      ["SIGNIFICANT PROJECTS"]: updatedProject,
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

  const removeProject = (key) => {
    const updatedProjList = sectionsField["SIGNIFICANT PROJECTS"].$projects
    setSectionField({
      ...sectionsField,
      ["SIGNIFICANT PROJECTS"]: {
        $projects: updatedProjList.filter((proj, index) => index !== key),
      },
    })
  }

  const addTools = (data) => {
    setSectionField({
      ...sectionsField,
      ["TOOLS & FRAMEWORKS"]: _.assign(sectionsField["TOOLS & FRAMEWORKS"], data),
    })
  }

  const removeTools = (key) => {
    const updatedFields = sectionsField["TOOLS & FRAMEWORKS"]
    delete updatedFields[key]
    setSectionField({
      ...sectionsField,
      ["TOOLS & FRAMEWORKS"]: updatedFields,
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
        <Paper className={classes.userSection}>
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
        </Paper>
        <Paper className={classes.sectionForms}>
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
                      onChange={(e) =>
                        setSectionFieldSingleValue(e.target.value, key)
                      }
                    />
                  </>
                ) : null}
              </>
            )
          )}
          <SectionForm
            sectionsField={sectionsField}
            setValueResponsibility={setValueResponsibility}
            removeFieldResponsibility={removeFieldResponsibility}
            addFieldResponsibility={addFieldResponsibility}
            setSingleObjectField={setSingleObjectField}
            removeTools={removeTools}
            handleOpenTsForm={handleOpenTsForm}
            setSingleFieldProject={setSingleFieldProject}
            removeProject={removeProject}
          />
          <Button color="secondary" fullWidth onClick={handleOpen}>
            Add proj
          </Button>
        </Paper>
      </form>
      <WriteResumeFile userData={userDataField} sectionData={sectionsField} />
      <AddProjModal
        handleClose={handleClose}
        open={open}
        createProject={createProject}
      />
      <TechnologyStackForm
        handleCloseTsForm={handleCloseTsForm}
        openTsForm={openTsForm}
        addTools={addTools}
      />
    </Paper>
  )
}

ResumeForm.propTypes = {
  setResumeFields: PropTypes.func,
}
