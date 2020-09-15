import React, { useState } from "react"
import { Button } from "@material-ui/core"
import SaveIcon from "@material-ui/icons/Save"
import { PropTypes } from "prop-types"
import yaml from "js-yaml"

export default function WriteResumeFile({ userData, sectionData, globalError }) {
  const [urlFile, setUrlFile] = useState(null)
  const createFile = () => {
    const cv = { cv: { $person: userData, $sections: sectionData } }
    const yamlStr = yaml.safeDump(cv, { indent: 2, lineWidth: 180 })
    const yamlWrite = new Blob([yamlStr], {
      type: "text/yaml",
    })
    const downloadUrl = window.URL.createObjectURL(yamlWrite)
    setUrlFile(downloadUrl)
  }
  return (
    <div>
      {urlFile ? (
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          id="download_link"
          download="resume.yaml"
          href={urlFile}
          startIcon={<SaveIcon />}
        >
          Download Resume File
        </Button>
      ) : (
        <Button
          disabled={globalError}
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => createFile()}
        >
          Save to *.yaml
        </Button>
      )}
    </div>
  )
}

WriteResumeFile.propTypes = {
  userData: PropTypes.objectOf(Object).isRequired,
  sectionData: PropTypes.objectOf(Object).isRequired,
}
