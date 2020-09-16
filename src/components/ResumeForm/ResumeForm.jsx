import React, { useState } from "react"
import { debounce, set, assign } from "lodash"
import { PropTypes } from "prop-types"
import {
  Button,
  Card,
  DialogContent,
  Dialog,
  DialogActions,
  DialogContentText,
} from "@material-ui/core"
import ReplayIcon from "@material-ui/icons/Replay"

import { useStyles } from "./styles"
import WriteResumeFile from "../WriteResumeFile"
import AddProjModal from "../AddProjModal"
import TechnologyStackForm from "../TechnologyStackForm"
import SecondarySectionPartForm from "../SecondarySectionPartForm"
import MainSectionPartForm from "../MainSectionPartForm"
import UserForm from "../UserForm"
import { useStickyState } from "../../services/StickyState"

export default function ResumeForm({ setResumeFields }) {
  const classes = useStyles()

  const [userDataField, setUserDataField] = useStickyState(
    JSON.parse(localStorage.getItem("resumeFields")).cv.$person,
    "udpdatedUserState"
  )
  const [sectionsField, setSectionField] = useStickyState(
    JSON.parse(localStorage.getItem("resumeFields")).cv.$sections,
    "updatedSectionState"
  )

  const [globalError, setGlobalError] = useState(false)

  const [cancelEditFile, setCancelEditFile] = useState(false)

  const debounceSetUserDataField = React.useRef(
    debounce((state) => setUserDataField(state), 300)
  ).current

  const debounceSetSectionField = React.useRef(
    debounce((state) => setSectionField(state), 300)
  ).current

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

  const closeCancelEditFile = () => {
    setCancelEditFile(false)
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
    const updatetSection = set(sectionsField[sectionKey], `${key}`, value)
    debounceSetSectionField({
      ...sectionsField,
      [sectionKey]: updatetSection,
    })
  }

  const addFieldResponsibility = (proj, indexProj) => {
    const currentProj =
      sectionsField["SIGNIFICANT PROJECTS"].$projects[indexProj][Object.keys(proj)]
    const newResponsibility = currentProj.Responsibilities.concat("")
    const newProj = set(
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
      (field, i) => i !== index
    )
    const newProj = set(
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
    const newProj = set(
      sectionsField["SIGNIFICANT PROJECTS"],
      `$projects[${indexProj}].${Object.keys(proj)}.Responsibilities`,
      currentProj.Responsibilities
    )
    debounceSetSectionField({
      ...sectionsField,
      ["SIGNIFICANT PROJECTS"]: newProj,
    })
  }

  const setSingleFieldProject = (value, proj, fieldKey, indexProj) => {
    const updatedProject = set(
      sectionsField["SIGNIFICANT PROJECTS"],
      `$projects[${indexProj}].${Object.keys(proj)}.${fieldKey}`,
      value
    )
    debounceSetSectionField({
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
      ["TOOLS & FRAMEWORKS"]: assign(sectionsField["TOOLS & FRAMEWORKS"], data),
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

  const setSectionFieldMultiValue = (value, key, index) => {
    const updatedField = sectionsField[key]
    updatedField[index] = value
    debounceSetSectionField({ ...sectionsField, [key]: updatedField })
  }

  const setSectionFieldSingleValue = (value, key) => {
    debounceSetSectionField({ ...sectionsField, [key]: value })
  }

  const setUserFieldValue = (value, key) => {
    const updatedState = userDataField
    const newState = { ...updatedState, [key]: value }
    debounceSetUserDataField(newState)
  }

  const deleteResume = () => {
    localStorage.clear()
    setResumeFields(null)
  }

  const resetChange = () => {
    setGlobalError(false)
    setUserDataField(JSON.parse(localStorage.getItem("resumeFields")).cv.$person)
    setSectionField(JSON.parse(localStorage.getItem("resumeFields")).cv.$sections)
  }

  return (
    <div className={classes.main}>
      <form>
        {/* UserinfoForm */}
        <Button
          fullWidth
          color="secondary"
          title={"another file"}
          onClick={() => setCancelEditFile(true)}
        >
          Choose another file
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="default"
          onClick={() => resetChange()}
        >
          Reset change
          <ReplayIcon />
        </Button>
        <Card className={classes.section} variant="elevation1">
          <UserForm
            setUserFieldValue={setUserFieldValue}
            userDataField={userDataField}
            setGlobalError={setGlobalError}
          />
        </Card>
        <MainSectionPartForm
          sectionsField={sectionsField}
          setSectionFieldMultiValue={setSectionFieldMultiValue}
          setSectionFieldSingleValue={setSectionFieldSingleValue}
          addField={addField}
          removeField={removeField}
          setGlobalError={setGlobalError}
        />
        <SecondarySectionPartForm
          sectionsField={sectionsField}
          setValueResponsibility={setValueResponsibility}
          removeFieldResponsibility={removeFieldResponsibility}
          addFieldResponsibility={addFieldResponsibility}
          setSingleObjectField={setSingleObjectField}
          removeTools={removeTools}
          handleOpenTsForm={handleOpenTsForm}
          setSingleFieldProject={setSingleFieldProject}
          removeProject={removeProject}
          setGlobalError={setGlobalError}
        />
        <Button variant="contained" onClick={handleOpen}>
          Add project
        </Button>
      </form>
      <WriteResumeFile
        userData={userDataField}
        sectionData={sectionsField}
        globalError={globalError}
      />
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
      <Dialog
        open={cancelEditFile}
        onClose={closeCancelEditFile}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to choose another file and cancel your current changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCancelEditFile} autoFocus>
            Disagree
          </Button>
          <Button onClick={() => deleteResume()}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

ResumeForm.propTypes = {
  setResumeFields: PropTypes.func,
}
