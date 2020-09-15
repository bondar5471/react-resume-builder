import React, { useState } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Fab,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

import { useStyles } from "./styles"

export default function AddProjModal({ handleClose, open, createProject }) {
  const classes = useStyles()
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
          <form
            className={classes.form}
            onSubmit={(e) => {
              e.preventDefault()
              newProject()
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              label="Project name"
              required
              onBlur={(e) => setName(e.target.value)}
            />

            <TextField
              fullWidth
              variant="filled"
              label="Description"
              required
              onBlur={(e) => setDescription(e.target.value)}
            />
            <Typography align="center">Responsibilities:</Typography>
            {responsibilities.map((res, index) => (
              <TextField
                key={index}
                fullWidth
                variant="filled"
                defaultValue={res}
                required
                onBlur={(e) => handleChangeRes(e.target.value, index)}
              />
            ))}
            <Fab
              color="primary"
              aria-label="add"
              onClick={() => setResponsibilities([...responsibilities, ""])}
            >
              <AddIcon />
            </Fab>
            <TextField
              fullWidth
              variant="filled"
              label="Role"
              required
              onBlur={(e) => setRole(e.target.value)}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Skills"
              required
              onBlur={(e) => setSkills(e.target.value)}
            />
            <TextField
              fullWidth
              variant="filled"
              label="Team info"
              required
              onBlur={(e) => setTeam(e.target.value)}
            />
            <DialogActions>
              <Button onClick={handleClose} variant="contained">
                Cancel
              </Button>
              <Button variant="contained" autoFocus type="submit">
                Add
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

AddProjModal.propTypes = {
  createProject: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
}
