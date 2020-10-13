import React from 'react';
import PropTypes from 'prop-types';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  Collapse,
  ListItemText,
  CircularProgress,
  Paper,
  Typography,
} from '@material-ui/core';
import { useStyles } from './styles';

export default function GitUploadModal({
  setIsOpenGitModal,
  isOpenGitModal,
  error,
  loadingFolder,
  repoFolders,
  openDir,
  isOpenListFiles,
  loadingFiles,
  listFiles,
  setFileFromGit,
}) {
  const classes = useStyles();
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      onClose={() => setIsOpenGitModal(false)}
      aria-labelledby="simple-dialog-title"
      open={isOpenGitModal}
    >
      <DialogTitle id="simple-dialog-title">Choose file</DialogTitle>
      <DialogContent>
        <Paper className={classes.dialogContent}>
          <Typography>Select file from current ones in git repository</Typography>
        </Paper>
        {error ? <Typography color="error">{error.message}</Typography> : null}
      </DialogContent>
      {loadingFolder ? (
        <CircularProgress color="secondary" className={classes.spin} />
      ) : (
        <List component="nav" aria-labelledby="nested-list-subheader" className={classes.list}>
          {repoFolders &&
            repoFolders.map(item => (
              <>
                <ListItem
                  className={classes.listItem}
                  button
                  onClick={() => openDir(item.path)}
                  key={item.name}
                >
                  <ListItemText primary={item.name} />
                  {isOpenListFiles ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={isOpenListFiles} timeout="auto" unmountOnExit>
                  {loadingFiles ? (
                    <CircularProgress color="secondary" className={classes.spin} />
                  ) : (
                    <List component="div" disablePadding>
                      {listFiles &&
                        listFiles.map(file => (
                          <ListItem
                            button
                            key={file.name}
                            onClick={() => setFileFromGit(file.path)}
                          >
                            <ListItemText primary={file.name} />
                          </ListItem>
                        ))}
                    </List>
                  )}
                </Collapse>
              </>
            ))}
        </List>
      )}
    </Dialog>
  );
}

GitUploadModal.propTypes = {
  repoFolders: PropTypes.array,
  listFiles: PropTypes.array,
  isOpenListFiles: PropTypes.bool,
  openDir: PropTypes.func,
  setFileFromGit: PropTypes.func,
  loadingFiles: PropTypes.bool,
  loadingFolder: PropTypes.bool,
  error: PropTypes.array,
  isOpenGitModal: PropTypes.bool,
  setIsOpenGitModal: PropTypes.func,
};
