import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import {
  Button,
  FormControl,
  Typography,
  Box,
  Avatar,
  FormLabel,
  FormHelperText,
  Card,
} from '@material-ui/core';
import yaml from 'js-yaml';
import { decode } from 'js-base64';

import { useStyles } from './styles';
import ResumeForm from '../ResumeForm';
import { getFileFromFolderRepo, getListFolderRepo } from '../../services/HandlerGit';
import GitUploadModal from '../GitUploadModal/GitUploadModal';
import { webExample } from '../../template/example.js';

export default function UploadResumeComponent() {
  const classes = useStyles();

  useEffect(() => {
    getRepoFolders();
  }, []);

  const [repoFolders, setRepoFolders] = useState(null);
  const [listFiles, setListFiles] = useState(null);
  const [error, setError] = useState(null);
  const [loadingFolder, setLoadingFolder] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [isOpenListFiles, setIsOpenListFiles] = useState(false);
  const [isOpenGitModal, setIsOpenGitModal] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeFields, setResumeFields] = useState(
    JSON.parse(localStorage.getItem('resumeFields')) || null,
  );
  const [fileName, setFileName] = useState('Upload');

  const [errors, setErrors] = useState([]);

  async function getRepoFolders() {
    try {
      setLoadingFolder(true);
      const response = await getListFolderRepo();
      setRepoFolders(response);
    } catch (e) {
      setError(e);
    } finally {
      setLoadingFolder(false);
    }
  }
  async function getListFiles(path) {
    try {
      setLoadingFiles(true);
      const response = await getFileFromFolderRepo(path);
      setListFiles(response);
    } catch (e) {
      setError(e);
    } finally {
      setLoadingFiles(false);
    }
  }

  const getFile = path => {
    try {
      writeFile(path);
    } catch (e) {
      setError(e);
    } finally {
      setIsOpenGitModal(false);
    }
  };

  const writeFile = async path => {
    const response = await getFileFromFolderRepo(path);
    const decodeContext = decode(response.content);
    const field = yaml.safeLoad(decodeContext);
    localStorage.setItem('currentSha', response.sha);
    localStorage.setItem('currentPath', path);
    localStorage.setItem('resumeFields', JSON.stringify(field));
    setResumeFields(field);
  };
  const hiddenFileInput = React.useRef(null);

  const handleClick = event => {
    event.preventDefault();
    hiddenFileInput.current.click();
  };

  const handleChange = event => {
    let file = event.target.files[0];
    setFileName(file.name);
    setResumeFile(file);
    readFile(file)
  };

  const readFile = file => {
    let reader = new FileReader();

    reader.readAsText(file);

    reader.onloadend = function () {
      const field = yaml.safeLoad(reader.result);
      localStorage.setItem('resumeFields', JSON.stringify(field));
      setResumeFields(field);
    };

    reader.onerror = function () {
      setErrors(reader.error);
    };
  };

  const openDir = async path => {
    if (!isOpenListFiles) {
      await getListFiles(path);
    }
    setIsOpenListFiles(!isOpenListFiles);
  };

  const setFileFromGit = async path => {
    await getFile(path);
  };

  const setTemplate = event => {
    event.preventDefault();
    const field = yaml.safeLoad(webExample.web);
    localStorage.setItem('resumeFields', JSON.stringify(field));
    setResumeFields(field);
  };

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
            <Typography variant="h4">Resume builder</Typography>
          </div>
          <form className={classes.form} noValidate onSubmit={readFile}>
            <FormControl component="fieldset">
              <Card className={classes.cardBox}>
                <Button
                  color="primary"
                  fullWidth
                  variant="contained"
                  component="span"
                  className={classes.button}
                  startIcon={<InsertDriveFileIcon />}
                  onClick={e => setTemplate(e)}
                >
                  CREATE CV
                </Button>

                <Button
                  variant="outlined"
                  component={Link}
                  to="/git_explorer"
                  fullWidth
                  startIcon={<BorderColorIcon />}
                  className={classes.editButton}
                >
                  EDIT CV
                </Button>

                <input
                  style={{ display: 'none' }}
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
                  fullWidth
                  className={classes.editButton}
                  startIcon={<CloudUploadIcon />}
                  onClick={handleClick}
                >
                  UPLOAD CV
                </Button>
                <FormHelperText> Support only .yml, .yaml files</FormHelperText>
                {errors.map(e => (
                  <Typography color="error" key={e.message}>
                    {e.message}
                  </Typography>
                ))}
              </Card>
            </FormControl>
          </form>
          <GitUploadModal
            setIsOpenGitModal={setIsOpenGitModal}
            isOpenGitModal={isOpenGitModal}
            error={error}
            loadingFolder={loadingFolder}
            repoFolders={repoFolders}
            openDir={openDir}
            isOpenListFiles={isOpenListFiles}
            loadingFiles={loadingFiles}
            listFiles={listFiles}
            setFileFromGit={setFileFromGit}
          />
        </Box>
      )}
    </div>
  );
}
