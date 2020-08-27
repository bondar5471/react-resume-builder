import React, { useState } from "react"
import Avatar from "@material-ui/core/Avatar"
import Input from "@material-ui/core/Input"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import { Button } from "@material-ui/core"
import yaml from "js-yaml"

import { useStyles } from "./styles"
import ResumeForm from "../ResumeForm"

export default function UploadResumeComponent() {
  const classes = useStyles()

  const [resumeFile, setResumeFile] = useState(null)
  const [resumeFields, setResumeFields] = useState(null)

  const readFile = () => {
    let reader = new FileReader()

    reader.readAsText(resumeFile)

    reader.onloadend = function () {
      setResumeFields(yaml.safeLoad(reader.result))
    }

    reader.onerror = function () {
      //console.log(reader.error)
    }
  }

  return (
    <div>
      {resumeFields ? (
        <ResumeForm formData={resumeFields} />
      ) : (
        <Box>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <FileCopyIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Upload resume
            </Typography>
            <form className={classes.form} noValidate>
              <Input
                type="file"
                required
                fullWidth
                autoFocus
                onChange={(e) => {
                  e.preventDefault()
                  setResumeFile(e.target.files[0])
                }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={!resumeFile}
                onClick={() => readFile()}
              >
                Edit resume
              </Button>
            </form>
          </div>
        </Box>
      )}
    </div>
  )
}
