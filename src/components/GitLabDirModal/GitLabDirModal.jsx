import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ArrowBack, Folder } from '@material-ui/icons';
import { Gitlab } from '@gitbeaker/browser';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Paper,
  Typography,
  ListItemIcon,
  IconButton,
  Button,
  Snackbar,
} from '@material-ui/core';

import { backStepPath } from '../../services/gitLabService';
import { useStyles } from './styles';
import Alert from '../Alert';

export default function GitLabDirModal({
  openModal,
  setOpenModal,
  setOpenAlertNewPush,
  createYamlData,
  fileNameGit,
}) {
  const classes = useStyles();
  useEffect(() => {
    getDirTree();
  }, []);

  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState(null);
  const [path, setPath] = useState('/');
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const getDirTree = path => {
    setLoading(true);
    const api = new Gitlab({
      host: process.env.REACT_APP_GITLAB_URL,
      token: process.env.REACT_APP_GITLAB_TOKEN,
    });
    const id = process.env.REACT_APP_GITLAB_PROJ_ID;
    api.Repositories.tree(id, { path }).then(files => {
      setFolders(files);
      setLoading(false);
    });
  };

  const openFolder = folder => {
    setPath(folder.path);
    getDirTree(folder.path);
  };

  const backStep = () => {
    const backUrl = backStepPath(path);
    setPath(backUrl);
    getDirTree(backUrl);
  };

  const createNewPushRequest = async () => {
    const yamlData = createYamlData();
    const api = new Gitlab({
      host: process.env.REACT_APP_GITLAB_URL,
      token: process.env.REACT_APP_GITLAB_TOKEN,
    });
    const id = process.env.REACT_APP_GITLAB_PROJ_ID;
    const userName = localStorage.getItem('user');
    const resumePath = path + '/' + fileNameGit + '.yaml';
    api.RepositoryFiles.create(
      id,
      resumePath,
      'master',
      yamlData,
      `User ${userName} add file ${fileNameGit}`,
    )
      .then(response => {
        localStorage.setItem('currentPath', response.file_path);
        setOpenAlertNewPush(true);
        setOpenModal(false);
      })
      .catch(error => {
        if (error.response.status === 400) {
          setOpenErrorAlert(true);
        }
      });
  };

  const uploadFile = () => {
    try {
      createNewPushRequest();
    } catch (e) {
      if (e.response.status === 400) {
        setOpenErrorAlert(true);
      }
    }
  };
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={() => setOpenModal(false)}
      aria-labelledby="git-dir-dialog-title"
      open={openModal}
    >
      <DialogTitle id="git-dir-dialog-title">Upload new file</DialogTitle>
      <DialogContent>
        <Paper className={classes.dialogContent}>
          <Typography>Sect folder for upload file:</Typography>
          <hr />
          {path ? (
            <Typography className={classes.pathBar}>
              <IconButton aria-label="back" onClick={() => backStep()}>
                <ArrowBack />
              </IconButton>
              {path}
            </Typography>
          ) : null}
        </Paper>
      </DialogContent>
      {loading ? (
        <CircularProgress color="secondary" className={classes.spin} />
      ) : (
        <Paper>
          <List component="nav" aria-label="main mailbox folders">
            {folders &&
              folders.map(folder =>
                folder.type === 'tree' ? (
                  <ListItem button key={folder.id} onClick={() => openFolder(folder)}>
                    <ListItemIcon>
                      <Folder />
                    </ListItemIcon>
                    <ListItemText primary={folder.name} />
                  </ListItem>
                ) : null,
              )}
          </List>
          <Button fullWidth variant="contained" onClick={() => uploadFile()}>
            Upload new file
          </Button>
        </Paper>
      )}
      <Snackbar
        open={openErrorAlert}
        autoHideDuration={6000}
        onClose={() => setOpenErrorAlert(false)}
      >
        <Alert onClose={() => setOpenErrorAlert(false)} severity="error">
          File with this name already exists.
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

GitLabDirModal.propTypes = {
  setOpenModal: PropTypes.func,
  openModal: PropTypes.bool,
  setOpenAlertNewPush: PropTypes.func,
  createYamlData: PropTypes.func,
  fileNameGit: PropTypes.string,
};
