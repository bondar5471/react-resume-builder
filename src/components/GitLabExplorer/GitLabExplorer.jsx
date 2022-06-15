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
  Button,
} from '@material-ui/core';
import { Description, Folder, ArrowBack } from '@material-ui/icons';
import HomeIcon from '@material-ui/icons/Home';
import PropTypes from 'prop-types';

import { backStepPath } from '../../services/gitLabService';
import { useStyles } from './styles';
import { Link } from 'react-router-dom';

export default function GitLabExplorer({ history }) {
  const [currentPath, setCurrentPath] = useState('src/yaml');
  const [files, setFiles] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    openGitLabRepo(currentPath);
  }, []);

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
    const backUrl = backStepPath(currentPath);
    setCurrentPath(backUrl);
    openGitLabRepo(backUrl);
  };

  const checkFileFormatYaml = file => file.name.split('.').pop() === 'yaml';

  const classes = useStyles();
  return (
    <Paper className={classes.gitContainer}>
      <Button component={Link} startIcon={<HomeIcon />} to="/" variant="contained" fullWidth>
        Home
      </Button>
      <Paper className={classes.head}>
        <Typography variant="h6">Select file *.yaml:</Typography>
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
                <React.Fragment key={file.id}>
                  {file.type === 'tree' ? (
                    <ListItem button key={file.id} onClick={() => recognizeType(file)}>
                      <ListItemIcon>
                        <Folder />
                      </ListItemIcon>
                      <ListItemText primary={file.name} />
                    </ListItem>
                  ) : (
                    <React.Fragment>
                      {checkFileFormatYaml(file) ? (
                        <ListItem button key={file.id} onClick={() => recognizeType(file)}>
                          <ListItemIcon>
                            <Description />
                          </ListItemIcon>
                          <ListItemText primary={file.name} />
                        </ListItem>
                      ) : null}
                    </React.Fragment>
                  )}
                </React.Fragment>
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
