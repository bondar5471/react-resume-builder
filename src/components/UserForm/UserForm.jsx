import React, { useState, useEffect, useMemo } from 'react';
import { Grid, TextField, Typography, Tooltip, Button, IconButton } from '@material-ui/core';
import { CloudUpload } from '@material-ui/icons';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PropTypes from 'prop-types';
import { handleInput } from '../../services/HandleInput';
import UploadAvatarModal from '../UploadAvatarModal';
import { useStyles } from './styles';
import { copyToClipboard } from '../../services/copyToClipboard';

export default function UserForm({
  setUserFieldValue,
  userDataField,
  setGlobalError,
  setUserDataField,
  currentPath,
}) {
  const [copyText, setCopyText] = useState("Copy path");

  useEffect(() => {
    setAvatarPreview();
  }, [userDataField]);
  const [openUploadAvatarModal, setOpenUploadAvatarModal] = useState(false);
  const [preview, setPreview] = useState(null);

  const setAvatarPreview = () => {
    if (userDataField.$photo) {
      const avatarUrl = userDataField.$photo.split('cv/main')[1];
      const previewAvatarUrl = `${process.env.REACT_APP_GITLAB_URL}/cv/main/-/raw/master${avatarUrl}`;
      setPreview(previewAvatarUrl);
    }
  };

  const capitalizeLabel = label => {
    if (typeof label !== 'string') return '';
    const cutLabel = label.substring(1);
    const changedLabel = cutLabel.charAt(0).toUpperCase() + cutLabel.slice(1);
    return changedLabel;
  };

  const handleErrorImg = () => {
    setPreview(null);
  };

  const checkPhotoExist = () => {
    const userFieldKeys = Object.keys(userDataField);
    return userFieldKeys.includes('$photo');
  };

  const removePhotoField = () => {
    const updatedFields = userDataField;
    delete updatedFields['$photo'];
    setUserDataField({ ...userDataField, ...updatedFields });
    setPreview(null);
  };

  const addPhotoField = () => {
    setUserFieldValue('', '$photo');
  };

  const classes = useStyles();

  const copyContent = async () => {
    copyToClipboard(window.location.href);
    setCopyText('Copied!');
    setTimeout(() => setCopyText('Copy path'), 5000);
  };

  return (
    <React.Fragment>
      {currentPath &&
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              variant="outlined"
              disabled
              fullWidth
              key="editLink"
              label="URL"
              value={window.location.href}
            />
          </Grid>
          <Grid item xs={2}>
            <Tooltip title={copyText}>
              <IconButton color="primary" onClick={() => copyContent()}>
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      }
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Typography color="textSecondary" gutterBottom>
            PERSONAL DETAILS
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {Object.entries(userDataField).map(([key, value]) => (
          <Grid key={key} item sm={key === '$photo' ? 12 : 6} xs={12}>
            {key === '$photo' ? (
              <span>
                <Tooltip title="Specify the path to the file or upload file.">
                  <TextField
                    error={!value}
                    variant="outlined"
                    fullWidth
                    key="$photo"
                    label="Photo"
                    value={value}
                    onChange={e =>
                      handleInput(
                        setGlobalError,
                        e.target.value,
                        setUserFieldValue(e.target.value, key),
                      )
                    }
                    helperText={!value ? 'This field is required' : null}
                  />
                </Tooltip>
                {preview ? (
                  <>
                    <Typography>Preview</Typography>
                    <img
                      onError={() => handleErrorImg()}
                      src={preview}
                      className={classes.avatar}
                      alt="Photo not found in git"
                    />
                  </>
                ) : (
                  <>
                    <Typography>Preview</Typography>
                    <Typography color="error">Invalid photo url</Typography>
                  </>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.uploadButton}
                  startIcon={<CloudUpload />}
                  onClick={() => setOpenUploadAvatarModal(true)}
                >
                  Set photo url from gitlab
                </Button>
              </span>
            ) : (
              <TextField
                error={!value}
                fullWidth
                key={key}
                variant="outlined"
                label={capitalizeLabel(key)}
                defaultValue={value}
                onBlur={e =>
                  handleInput(
                    setGlobalError,
                    e.target.value,
                    setUserFieldValue(e.target.value, key),
                  )
                }
                helperText={!value ? 'This field is required' : null}
              />
            )}
          </Grid>
        ))}
      </Grid>
      <UploadAvatarModal
        openUploadAvatarModal={openUploadAvatarModal}
        setOpenUploadAvatarModal={setOpenUploadAvatarModal}
        setUserFieldValue={setUserFieldValue}
        setGlobalError={setGlobalError}
        setPreview={setPreview}
      />
      {checkPhotoExist() ? (
        <Button
          className={classes.photoButton}
          variant="contained"
          color="secondary"
          onClick={() => removePhotoField()}
        >
          Remove section photo
        </Button>
      ) : (
        <Button
          className={classes.photoButton}
          variant="contained"
          color="primary"
          onClick={() => addPhotoField()}
        >
          Add section photo
        </Button>
      )}
    </React.Fragment>
  );
}

UserForm.propTypes = {
  userDataField: PropTypes.objectOf(Object).isRequired,
  setUserFieldValue: PropTypes.func.isRequired,
  setGlobalError: PropTypes.func,
  setUserDataField: PropTypes.func,
  currentPath: PropTypes.string
};
