import React, { useState } from 'react';
import { Button, Card, TextField, Snackbar, Paper, Typography } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { PropTypes } from 'prop-types';
import yaml from 'js-yaml';
import GitHubIcon from '@material-ui/icons/GitHub';
import MuiAlert from '@material-ui/lab/Alert';
import { encode } from 'js-base64';

import { useStyles } from './styles';
import { updateOrCreateFile } from '../../services/HandlerGit';

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

  async function updateResume() {
    try {
      setLoading(true);
      const cv = { cv: { $person: userData, $sections: sectionData } };
      const yamlStr = yaml.safeDump(cv, { indent: 2, lineWidth: 180 });
      const encodeContent = encode(yamlStr);
      const responce = await updateOrCreateFile(encodeContent);
      setOpenAlert(responce.status === 200);
      localStorage.setItem('currentSha', responce.data.content.sha);
      handleSave();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  const updateFileOnRepo = async () => {
    await updateResume();
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
              <Typography>Upload file to git:</Typography>
              <Button
                className={classes.gitButton}
                disabled={globalError || loading}
                variant="contained"
                fullWidth
                startIcon={<GitHubIcon />}
                onClick={() => updateFileOnRepo()}
              >
                Push to github
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
