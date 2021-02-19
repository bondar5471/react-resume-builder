import React, { useEffect, useState } from 'react';
import { Gitlab } from '@gitbeaker/browser';
import { decode } from 'js-base64';
import yaml from 'js-yaml';
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Paper,
  CircularProgress,
} from '@material-ui/core';
import { Description, Folder, ArrowBack } from '@material-ui/icons';
import PropTypes from 'prop-types';

import { useStyles } from './styles';

export default function GitLabExplorer({ history }) {
  useEffect(() => {
    openGitLabRepo();
  }, []);
  const [currentPath, setCurrentPath] = useState(null);
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const openGitLabRepo = path => {
    setLoading(true);
    const api = new Gitlab({
      host: process.env.REACT_APP_GITLAB_URL,
      token: process.env.REACT_APP_GITLAB_TOKEN,
    });
    const id = process.env.REACT_APP_GITLAB_PROJ_ID;
    api.Repositories.tree(id, { path }).then(files => {
      setFiles(files);
      setLoading(false);
    });
  };

  const recognizeType = item => {
    if (item.type === 'tree') {
      handleFolderClick(item);
    } else {
      handleFileClick(item);
    }
  };
  const getFile = async path => {
    const api = new Gitlab({
      host: process.env.REACT_APP_GITLAB_URL,
      token: process.env.REACT_APP_GITLAB_TOKEN,
    });
    const id = process.env.REACT_APP_GITLAB_PROJ_ID;
    const response = await api.RepositoryFiles.show(id, path, 'master');
    const fileExtension = response.file_path.split('.').pop();
    if (fileExtension === 'yaml') {
      const decodeContext = decode(response.content);
      const field = yaml.safeLoad(decodeContext);
      localStorage.setItem('currentSha', response.content_sha256);
      localStorage.setItem('currentPath', response.file_path);
      localStorage.setItem('resumeFields', JSON.stringify(field));
      history.push('/');
    } else {
      setError('The file is an unknown format and cannot be opened');
    }
  };

  const handleFolderClick = folder => {
    setError(null);
    setCurrentPath(folder.path);
    openGitLabRepo(folder.path);
  };

  const handleFileClick = file => {
    setError(null);
    getFile(file.path);
  };

  const backStep = () => {
    const splitUrl = currentPath.split('/');
    splitUrl.pop();
    const backUrl = splitUrl.join('/');
    setCurrentPath(backUrl);
    openGitLabRepo(backUrl);
  };
  const classes = useStyles();
  return (
    <Paper>
      <Paper className={classes.head}>
        <Typography variant="h6">Select file for editing...</Typography>
        {error ? <Typography color="secondary">{error}</Typography> : null}
      </Paper>
      {loading ? (
        <CircularProgress size="50px" className={classes.spinner} />
      ) : (
        <>
          <Typography>
            {currentPath ? (
              <IconButton aria-label="back" onClick={() => backStep()}>
                <ArrowBack />
              </IconButton>
            ) : null}
            {currentPath}
          </Typography>
          <List component="nav" aria-label="main mailbox folders">
            {files &&
              files.map(file => (
                <ListItem button key={file.id} onClick={() => recognizeType(file)}>
                  <ListItemIcon>{file.type === 'tree' ? <Folder /> : <Description />}</ListItemIcon>
                  <ListItemText primary={file.name} />
                </ListItem>
              ))}
          </List>
        </>
      )}
    </Paper>
  );
}

GitLabExplorer.propTypes = {
  history: PropTypes.func,
};
