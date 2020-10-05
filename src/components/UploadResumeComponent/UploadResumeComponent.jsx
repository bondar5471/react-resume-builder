import React, { useState, useEffect } from "react"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import {
  Button,
  FormControl,
  Typography,
  Box,
  Avatar,
  FormLabel,
  FormHelperText,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  Collapse,
  ListItemText,
} from "@material-ui/core"
import yaml from "js-yaml"
import GitHubIcon from "@material-ui/icons/GitHub"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"

import { useStyles } from "./styles"
import ResumeForm from "../ResumeForm"
import { getFileFromFolderRepo, getListFolderRepo } from "../../services/HandlerGit"

export default function UploadResumeComponent() {
  const classes = useStyles()
  const [repoFolders, setRepoFolders] = useState(null)
  const [listFiles, setListFiles] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isOpenListFiles, setIsOpenListFiles] = useState(false)
  const [isOpenGitModal, setIsOpenGitModal] = useState(false)
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeFields, setResumeFields] = useState(
    JSON.parse(localStorage.getItem("resumeFields")) || null
  )
  const [fileName, setFileName] = useState("Upload")

  const [errors, setErrors] = useState([])

  async function getRepoFolders() {
    try {
      setLoading(true)
      const responce = await getListFolderRepo()
      setRepoFolders(responce)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }
  async function getListFiles(path) {
    try {
      setLoading(true)
      const responce = await getFileFromFolderRepo(path)
      setListFiles(responce)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }
  async function getFile(path) {
    try {
      setLoading(true)
      const responce = await getFileFromFolderRepo(path)
      const decodeContext = atob(responce.content)
      const field = yaml.safeLoad(decodeContext)
      localStorage.setItem("currentSha", responce.sha)
      localStorage.setItem("currentPath", path)
      localStorage.setItem("resumeFields", JSON.stringify(field))
      setResumeFields(field)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getRepoFolders()
  }, [])

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

  const openDir = async (path) => {
    await getListFiles(path)
    setIsOpenListFiles(!isOpenListFiles)
  }

  const setFileFromGit = async (path) => {
    await getFile(path)
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
                onChange={handleChange}
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
              <Button
                onClick={() => setIsOpenGitModal(true)}
                className={classes.editButton}
                variant="contained"
                color="primary"
                fullWidth
                startIcon={<GitHubIcon />}
              >
                Upload from repo git
              </Button>
            </FormControl>
          </form>
          <Dialog
            fullWidth
            maxWidth="md"
            onClose={() => setIsOpenGitModal(false)}
            aria-labelledby="simple-dialog-title"
            open={isOpenGitModal}
          >
            <DialogTitle id="simple-dialog-title">Choose file</DialogTitle>
            <DialogContent>
              <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
              >
                {repoFolders &&
                  repoFolders.map((item) => (
                    <>
                      <ListItem
                        button
                        onClick={() => openDir(item.path)}
                        key={item.name}
                      >
                        <ListItemText primary={item.name} />
                        {isOpenListFiles ? <ExpandLess /> : <ExpandMore />}
                      </ListItem>
                      <Collapse in={isOpenListFiles} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {listFiles &&
                            listFiles.map((file) => (
                              <ListItem
                                button
                                key={file.name}
                                onClick={() => setFileFromGit(file.path)}
                              >
                                <ListItemText primary={file.name} />
                              </ListItem>
                            ))}
                        </List>
                      </Collapse>
                    </>
                  ))}
              </List>
            </DialogContent>
          </Dialog>
        </Box>
      )}
    </div>
  )
}
