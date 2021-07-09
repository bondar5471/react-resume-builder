import React, { useState } from 'react';
import {
  Button,
  Card,
  TextField,
  Snackbar,
  Paper,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SaveIcon from '@material-ui/icons/Save';
import { PropTypes } from 'prop-types';
import yaml from 'js-yaml';
import { Gitlab } from '@gitbeaker/browser';
import { StoreContext } from '../../store/Store';
import GitLabDirModal from '../GitLabDirModal';
import Alert from '../Alert';
import { useStyles } from './styles';

export default function WriteResumeFile({ globalError }) {
  const [urlFile, setUrlFile] = useState(null);
  const [fileName, setFileName] = useState('resume');
  const [fileNameGit, setFileNameGit] = useState('resume');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [openAlertNewPush, setOpenAlertNewPush] = useState(false);

  const store = React.useContext(StoreContext);
  const { userFields, sectionsFields } = store;

  const createYamlData = () => {
    const cv = { cv: { $person: userFields, $sections: sectionsFields } };
    const yamlStr = yaml.safeDump(cv, { indent: 2, lineWidth: 180 });
    return yamlStr;
  };

  const createFile = () => {
    const yamlData = createYamlData();
    const yamlWrite = new Blob([yamlData], {
      type: 'text/yaml',
    });
    setExpanded('save');
    const downloadUrl = window.URL.createObjectURL(yamlWrite);
    setUrlFile(downloadUrl);
  };

  const handleUpdate = async () => {
    setLoading(true);
    setExpanded('save');
    const yamlData = createYamlData();
    const api = new Gitlab({
      host: process.env.REACT_APP_GITLAB_URL,
      token: process.env.REACT_APP_GITLAB_TOKEN,
    });
    const path = localStorage.getItem('currentPath');
    const id = process.env.REACT_APP_GITLAB_PROJ_ID;
    const userName = localStorage.getItem('user');
    const response = await api.RepositoryFiles.edit(
      id,
      path,
      'master',
      yamlData,
      `User ${userName} updated ${path}`,
    );
    setOpenAlert(response.file_path === path);
  };

  const updateFileOnGitLab = () => {
    try {
      handleUpdate();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
      setExpanded(null);
    }
  };

  const fileNameValidation = () => {
    return fileName.indexOf(' ') >= 0 || fileName === '';
  };
  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const handleBlurAccordion = () => event => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setExpanded(null);
      setFileName('resume');
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.saveAccordion}>
      <Accordion
        square
        expanded={expanded === 'save'}
        onChange={handleChange('save')}
        onBlur={handleBlurAccordion()}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className={classes.saveMenuHeader}
        >
          <Typography>Save/Upload cv</Typography>
        </AccordionSummary>
        <AccordionDetails className={classes.saveMenu}>
          {urlFile ? (
            <Card className={classes.card}>
              <Button
                className={classes.downloadButton}
                fullWidth
                variant="contained"
                color="secondary"
                id="download_link"
                download={`${fileName}.yaml`}
                href={urlFile}
                onClick={() => {
                  setUrlFile(null);
                  setExpanded(null);
                }}
                startIcon={<SaveIcon />}
              >
                Download Cv
              </Button>
            </Card>
          ) : (
            <div>
              <span>
                <Paper className={classes.paperContainer}>
                  <Typography>Save to file:</Typography>
                  <TextField
                    className={classes.inputFileName}
                    fullWidth
                    error={fileNameValidation()}
                    helperText={
                      fileNameValidation() ? 'The field cannot be empty and contain spaces' : ''
                    }
                    label="File name"
                    value={fileName}
                    onChange={e => setFileName(e.target.value)}
                  />
                  <Button
                    className={classes.saveAsButton}
                    disabled={globalError || fileNameValidation()}
                    variant="contained"
                    fullWidth
                    onClick={() => createFile()}
                  >
                    Save as file
                  </Button>
                </Paper>
                {localStorage.getItem('currentPath') ? null : (
                  <Paper className={classes.paperContainer}>
                    <TextField
                      className={classes.inputFileName}
                      fullWidth
                      error={fileNameValidation()}
                      helperText={
                        fileNameValidation() ? 'The field cannot be empty and contain spaces' : ''
                      }
                      label="File name"
                      value={fileName}
                      onChange={e => setFileName(e.target.value)}
                    />
                    <Button
                      className={classes.saveAsButton}
                      disabled={globalError || fileNameValidation()}
                      variant="contained"
                      fullWidth
                      onClick={() => setOpenModal(true)}
                    >
                      Upload new cv gitlab
                    </Button>
                  </Paper>
                )}
              </span>
              {localStorage.getItem('currentPath') ? (
                <span>
                  <Paper className={classes.paperContainer}>
                    <Typography>Update file on GitLab :</Typography>
                    <Button
                      className={classes.gitButton}
                      disabled={globalError || loading}
                      variant="contained"
                      fullWidth
                      onClick={() => updateFileOnGitLab()}
                    >
                      Update cv
                    </Button>
                  </Paper>
                  <Paper className={classes.paperContainer}>
                    <Typography>Add new version resume on GitLab :</Typography>
                    <TextField
                      className={classes.inputFileName}
                      fullWidth
                      error={fileNameValidation()}
                      helperText={
                        fileNameValidation() ? 'The field cannot be empty and contain spaces' : ''
                      }
                      label="File name"
                      value={fileNameGit}
                      onChange={e => setFileNameGit(e.target.value)}
                    />
                    <Button
                      className={classes.saveAsButton}
                      disabled={globalError || fileNameValidation()}
                      variant="contained"
                      fullWidth
                      onClick={() => setOpenModal(true)}
                    >
                      Upload new cv gitlab
                    </Button>
                  </Paper>
                </span>
              ) : null}
            </div>
          )}
        </AccordionDetails>
      </Accordion>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
        <Alert onClose={() => setOpenAlert(false)} severity="success">
          Updated successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={6000} onClose={() => setOpenAlert(false)}>
        <Alert onClose={() => setOpenAlert(false)} severity="error">
          Sorry, something went wrong.
        </Alert>
      </Snackbar>
      <Snackbar
        open={openAlertNewPush}
        autoHideDuration={6000}
        onClose={() => setOpenAlertNewPush(false)}
      >
        <Alert onClose={() => setOpenAlertNewPush(false)} severity="success">
          New file pushed successfully!
        </Alert>
      </Snackbar>
      <GitLabDirModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setOpenAlertNewPush={setOpenAlertNewPush}
        createYamlData={createYamlData}
        fileNameGit={fileNameGit}
      />
    </div>
  );
}

WriteResumeFile.propTypes = {
  globalError: PropTypes.bool,
};
