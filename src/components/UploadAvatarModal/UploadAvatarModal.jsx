import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ArrowBack, Folder, Photo } from '@material-ui/icons';
// import { Gitlab } from '@gitbeaker/browser';
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
  Snackbar,
} from '@material-ui/core';
import { api, id } from '../../services/HandlerGitLab.js';
import { backStepPath } from '../../services/gitLabService';
import { useStyles } from './styles';
import Alert from '../Alert';
import { handleInput } from '../../services/HandleInput';

export default function UploadAvatarModal({
  openUploadAvatarModal,
  setOpenUploadAvatarModal,
  setUserFieldValue,
  setGlobalError,
  setPreview,
}) {
  const classes = useStyles();
  useEffect(() => {
    getDirTree();
  }, []);

  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState(null);
  const [path, setPath] = useState('/');
  const [openErrorAlert, setOpenErrorAlert] = useState(false);

  const getDirTree = path => {
    setLoading(true);
    api.Repositories.tree(id, { path }).then(data => {
      setFiles(data);
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
    setPreview(null);
  };

  const setAvatarFile = file => {
    if (checkFileFormatJpg) {
      const avatarPath = `/builds/cv/main/${file.path}`;
      const previewAvatarUrl = `${process.env.REACT_APP_GITLAB_URL}/cv/main/-/raw/master/${file.path}`;
      setPreview(previewAvatarUrl);
      handleInput(setGlobalError, avatarPath, setUserFieldValue(avatarPath, '$photo'));
      setOpenUploadAvatarModal(false);
    } else {
      setOpenErrorAlert(true);
    }
  };

  const checkFileFormatJpg = file => file.name.split('.').pop() === 'jpg';

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={() => setOpenUploadAvatarModal(false)}
      aria-labelledby="avatar-dialog-title"
      open={openUploadAvatarModal}
    >
      <DialogTitle id="avatar-dialog-title">Upload photo</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography>Select file *.jpg :</Typography>
        {path ? (
          <Typography className={classes.pathBar}>
            <IconButton aria-label="back" onClick={() => backStep()}>
              <ArrowBack />
            </IconButton>
            {path}
          </Typography>
        ) : null}
      </DialogContent>
      {loading ? (
        <CircularProgress color="secondary" className={classes.spin} />
      ) : (
        <Paper>
          <List component="nav" aria-label="main mailbox folders">
            {files &&
              files.map(file =>
                file.type === 'tree' ? (
                  <ListItem button key={file.id} onClick={() => openFolder(file)}>
                    <ListItemIcon>
                      <Folder />
                    </ListItemIcon>
                    <ListItemText primary={file.name} />
                  </ListItem>
                ) : (
                  <React.Fragment key={file.id}>
                    {checkFileFormatJpg(file) ? (
                      <ListItem button onClick={() => setAvatarFile(file)}>
                        <ListItemIcon>
                          <Photo />
                        </ListItemIcon>
                        <ListItemText primary={file.name} />
                      </ListItem>
                    ) : null}
                  </React.Fragment>
                ),
              )}
          </List>
        </Paper>
      )}
      <Snackbar
        open={openErrorAlert}
        autoHideDuration={6000}
        onClose={() => setOpenErrorAlert(false)}
      >
        <Alert onClose={() => setOpenErrorAlert(false)} severity="error">
          Only *.jpg file.
        </Alert>
      </Snackbar>
    </Dialog>
  );
}

UploadAvatarModal.propTypes = {
  setOpenUploadAvatarModal: PropTypes.func,
  setPreview: PropTypes.func,
  setUserFieldValue: PropTypes.func,
  setGlobalError: PropTypes.func,
  openUploadAvatarModal: PropTypes.bool,
};
