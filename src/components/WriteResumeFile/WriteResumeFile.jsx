import React, { useState } from "react"
import { Button, Card, TextField } from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"
import { PropTypes } from "prop-types"
import yaml from "js-yaml"
import Tooltip from "@material-ui/core/Tooltip"

import { useStyles } from "./styles"

export default function WriteResumeFile({ userData, sectionData, globalError }) {
  const [urlFile, setUrlFile] = useState(null)
  const [fileName, setFileName] = useState("resume")

  const createFile = () => {
    const cv = { cv: { $person: userData, $sections: sectionData } }
    const yamlStr = yaml.safeDump(cv, { indent: 2, lineWidth: 180 })
    const yamlWrite = new Blob([yamlStr], {
      type: "text/yaml",
    })
    const downloadUrl = window.URL.createObjectURL(yamlWrite)
    setUrlFile(downloadUrl)
  }

  const fileNameValidation = () => {
    return fileName.indexOf(" ") >= 0 || fileName === ""
  }
  const classes = useStyles()
  return (
    <div>
      {urlFile ? (
        <Card className={classes.card}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            id="download_link"
            download={`${fileName}.yaml`}
            href={urlFile}
            onClick={() => setUrlFile(null)}
            startIcon={<SaveIcon />}
          >
            Download Resume File
          </Button>
        </Card>
      ) : (
        <Card className={classes.card}>
          <TextField
            className={classes.inputFileName}
            fullWidth
            error={fileNameValidation()}
            helperText={
              fileNameValidation()
                ? "The field cannot be empty and contain spaces"
                : ""
            }
            label="File name"
            defaultValue={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <Tooltip
            element={"span"}
            title={
              globalError ? (
                <span style={{ fontSize: "22px" }}>On of the inputs are blank</span>
              ) : (
                ""
              )
            }
          >
            <span>
              <Button
                disabled={globalError || fileNameValidation()}
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => createFile()}
              >
                {`Save to ${fileName}.yaml`}
              </Button>
            </span>
          </Tooltip>
        </Card>
      )}
    </div>
  )
}

WriteResumeFile.propTypes = {
  userData: PropTypes.objectOf(Object).isRequired,
  sectionData: PropTypes.objectOf(Object).isRequired,
  globalError: PropTypes.bool,
}
