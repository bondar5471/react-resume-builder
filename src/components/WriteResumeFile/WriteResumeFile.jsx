import React, { useState } from 'react';
import { Button, Card, TextField, Snackbar, Paper, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { PropTypes } from 'prop-types';
import yaml from 'js-yaml';
import MuiAlert from '@material-ui/lab/Alert';
import { Gitlab } from '@gitbeaker/browser';

import { useStyles } from './styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function WriteResumeFile({ userData, sectionData, globalError }) {
  const [urlFile, setUrlFile] = useState(null);
  const [fileName, setFileName] = useState('resume');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  const createFile = () => {
    const cv = { cv: { $person: userData, $sections: sectionData } };
    const yamlStr = yaml.safeDump(cv, { indent: 2, lineWidth: 180 });
    const yamlWrite = new Blob([yamlStr], {
      type: 'text/yaml',
    });
    const downloadUrl = window.URL.createObjectURL(yamlWrite);
    setUrlFile(downloadUrl);
  };

  const handleSave = () => {
    const updatedCv = { cv: { $person: userData, $sections: sectionData } };
    localStorage.setItem('resumeFields', JSON.stringify(updatedCv));
  };

  const updateFileOnGitLab = async () => {
    try {
      setLoading(true);
      const cv = { cv: { $person: userData, $sections: sectionData } };
      const yamlStr = yaml.safeDump(cv, { indent: 2, lineWidth: 180 });
      const api = new Gitlab({
        host: process.env.REACT_APP_GITLAB_URL,
        token: process.env.REACT_APP_GITLAB_TOKEN,
      });
      const path = localStorage.getItem('currentPath');
      const id = process.env.REACT_APP_GITLAB_PROJ_ID;
      const responce = await api.RepositoryFiles.edit(
        id,
        path,
        'master',
        yamlStr,
        `Updated ${path}`,
      );
      setOpenAlert(responce.file_path === path);
      handleSave();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const fileNameValidation = () => {
    return fileName.indexOf(' ') >= 0 || fileName === '';
  };

  const classes = useStyles();

  return (
    <div>
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
              handleSave();
              setUrlFile(null);
            }}
            startIcon={<SaveIcon />}
          >
            Download Resume File
          </Button>
        </Card>
      ) : (
        <Card className={classes.card}>
          <Paper className={classes.saveAsFileContainer}>
            <Typography>Save to file:</Typography>
            <TextField
              className={classes.inputFileName}
              fullWidth
              error={fileNameValidation()}
              helperText={
                fileNameValidation() ? 'The field cannot be empty and contain spaces' : ''
              }
              label="File name"
              defaultValue={fileName}
              onChange={e => setFileName(e.target.value)}
            />
            <Button
              className={classes.saveAsButton}
              disabled={globalError || fileNameValidation()}
              variant="contained"
              fullWidth
              onClick={() => createFile()}
            >
              {`Save as file ${fileName}.yaml`}
            </Button>
          </Paper>
          {localStorage.getItem('currentPath') ? (
            <Paper className={classes.gitUploadContainer}>
              <Typography>Upload file to GitLab :</Typography>
              <Button
                className={classes.gitButton}
                disabled={globalError || loading}
                variant="contained"
                fullWidth
                onClick={() => updateFileOnGitLab()}
              >
                Push to gitlab
              </Button>
            </Paper>
          ) : null}
        </Card>
      )}
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
    </div>
  );
}

WriteResumeFile.propTypes = {
  userData: PropTypes.objectOf(Object).isRequired,
  sectionData: PropTypes.objectOf(Object).isRequired,
  globalError: PropTypes.bool,
};
