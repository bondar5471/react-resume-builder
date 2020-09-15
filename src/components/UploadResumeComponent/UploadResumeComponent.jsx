import React, { useState } from "react"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import {
  Button,
  FormControl,
  Typography,
  Box,
  Avatar,
  FormLabel,
  FormHelperText,
} from "@material-ui/core"
import yaml from "js-yaml"
import { useStyles } from "./styles"
import ResumeForm from "../ResumeForm"

export default function UploadResumeComponent() {
  const classes = useStyles()
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeFields, setResumeFields] = useState(
    JSON.parse(localStorage.getItem("resumeFields")) || null
  )
  const [fileName, setFileName] = useState("Upload")

  const [errors, setErrors] = useState([])

  const hiddenFileInput = React.useRef(null)

  const handleClick = (event) => {
    event.preventDefault()
    hiddenFileInput.current.click()
  }

  const handleChange = (event) => {
    let file = event.target.files[0]
    setFileName(file.name)
    setResumeFile(file)
  }

  const readFile = (event) => {
    event.preventDefault()
    let reader = new FileReader()

    reader.readAsText(resumeFile)

    reader.onloadend = function () {
      const field = yaml.safeLoad(reader.result)
      localStorage.setItem("resumeFields", JSON.stringify(field))
      setResumeFields(field)
    }

    reader.onerror = function () {
      setErrors(reader.error)
    }
  }

  return (
    <div>
      {resumeFields ? (
        <ResumeForm setResumeFields={setResumeFields} />
      ) : (
        <Box>
          <div className={classes.paper}>
            <Avatar
              variant="rounded"
              className={classes.avatar}
              src="https://image.flaticon.com/icons/svg/893/893505.svg"
            />
            <Typography component="h1" variant="h5">
              Resume Editor
            </Typography>
          </div>
          <form className={classes.form} noValidate onSubmit={readFile}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Please upload a resume file</FormLabel>
              <input
                style={{ display: "none" }}
                accept=".yaml, .yml"
                ref={hiddenFileInput}
                id="upload-file"
                name="upload-file"
                type="file"
                onBlur={handleChange}
              />
              <Button
                color="secondary"
                variant="contained"
                component="span"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                onClick={handleClick}
              >
                {fileName}
              </Button>
              <FormHelperText> Support only .yml, .yaml files</FormHelperText>
              {errors.map((e) => (
                <Typography color="error" key={e.message}>
                  {e.message}
                </Typography>
              ))}
              <Button
                className={classes.editButton}
                type="submit"
                variant="contained"
                color="default"
                fullWidth
                disabled={!resumeFile}
              >
                Edit
              </Button>
            </FormControl>
          </form>
        </Box>
      )}
    </div>
  )
}
