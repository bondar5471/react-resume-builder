import React from "react"
import PropTypes from "prop-types"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@material-ui/core"

export default function ResetFileAlert({
  cancelEditFile,
  closeCancelEditFile,
  deleteResume,
}) {
  return (
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
  )
}

ResetFileAlert.propTypes = {
  cancelEditFile: PropTypes.func,
  closeCancelEditFile: PropTypes.func,
  deleteResume: PropTypes.func,
}
