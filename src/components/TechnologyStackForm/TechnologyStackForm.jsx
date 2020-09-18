import React, { useState } from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import { TextField } from "@material-ui/core"
import Autocomplete from "@material-ui/lab/Autocomplete"

import { useStyles } from "./styles"

export default function TechnologyStackForm({
  handleCloseTsForm,
  openTsForm,
  addTools,
}) {
  const classes = useStyles()
  const [category, setCategory] = useState("")
  const [stack, setStack] = useState("")

  const addFieldTs = () => {
    const tools = { [category]: stack }
    addTools(tools)
    handleCloseTsForm()
  }

  const options = [
    "Programming Languages",
    "Ruby",
    "Testing Tools",
    "Databases",
    "JavaScript",
    "Responsive design",
    "CSS",
    "Version Control Systems",
    "Virtualization",
    "Cloud Platforms",
    "Tools",
  ]
  return (
    <div>
      <Dialog
        open={openTsForm}
        onClose={handleCloseTsForm}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add new category"}</DialogTitle>
        <DialogContent>
          <Autocomplete
            className={classes.textField}
            options={options.map((option) => option)}
            onChange={(event, newValue) => {
              setCategory(newValue)
            }}
            style={{ width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Category" variant="outlined" />
            )}
          />
          <TextField
            fullWidth
            className={classes.textField}
            variant="filled"
            label="Stack"
            onBlur={(e) => setStack(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTsForm} variant="contained">
            Cancel
          </Button>
          <Button onClick={() => addFieldTs()} variant="contained" autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

TechnologyStackForm.propTypes = {
  addTools: PropTypes.func,
  handleCloseTsForm: PropTypes.func,
  openTsForm: PropTypes.bool,
}
