import React, { useState } from "react"
import PropTypes from "prop-types"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import { TextField } from "@material-ui/core"

export default function TechnologyStackForm({
  handleCloseTsForm,
  openTsForm,
  addTools,
}) {
  const [category, setCategory] = useState("")
  const [stack, setStack] = useState("")

  const addFieldTs = () => {
    const tools = { [category]: stack }
    addTools(tools)
    handleCloseTsForm()
  }
  return (
    <div>
      <Dialog
        open={openTsForm}
        onClose={handleCloseTsForm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add new category"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="filled"
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Stack"
            onChange={(e) => setStack(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTsForm} color="primary">
            Cancel
          </Button>
          <Button onClick={() => addFieldTs()} color="primary" autoFocus>
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
