import React, { useState } from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import { TextField, Typography } from "@material-ui/core"

export default function AddProjModal({ handleClose, open, createProject }) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [responsibilities, setResponsibilities] = useState([""])
  const [role, setRole] = useState("")
  const [skills, setSkills] = useState("")
  const [team, setTeam] = useState("")

  const handleChangeRes = (value, index) => {
    const updatedData = responsibilities
    updatedData[index] = value
    setResponsibilities(updatedData)
  }

  const newProject = () => {
    const project = {
      [`${name}`]: {
        $description: description,
        Team: team,
        Role: role,
        Skills: skills,
        Responsibilities: responsibilities,
      },
    }
    createProject(project)
    handleClose()
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add project information"}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="filled"
            label="Project name"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <Typography align="center">Responsibilities:</Typography>
          {responsibilities.map((res, index) => (
            <TextField
              key={index}
              fullWidth
              variant="filled"
              defaultValue={res}
              onChange={(e) => handleChangeRes(e.target.value, index)}
            />
          ))}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => setResponsibilities([...responsibilities, ""])}
          >
            +
          </Button>
          <TextField
            fullWidth
            variant="filled"
            label="Role"
            onChange={(e) => setRole(e.target.value)}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Skills"
            onChange={(e) => setSkills(e.target.value)}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Team info"
            onChange={(e) => setTeam(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancel
          </Button>
          <Button onClick={() => newProject()} color="primary" autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

AddProjModal.propTypes = {
  createProject: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
}
